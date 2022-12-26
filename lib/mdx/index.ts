import { serialize } from 'next-mdx-remote/serialize';
import { promises as fs } from 'fs';
import NodeCache from 'node-cache';
import glob from 'fast-glob';
import hasha from 'hasha';
import path from 'path';
import z from 'zod';
import type {
  CreateSourceParams,
  MdxFileData,
  MdxFile,
  MdxNode,
  MdxSource,
} from './types';

const mdxCache = new NodeCache();

/**
 * Creates a source object that contains methods for retrieving MDX files and nodes.
 * @param params The source parameters. See {@link CreateSourceParams}.
 * @returns An {@link MdxSource} object containing the following methods:
 * - getAllMdxFiles: Returns an array of all the MDX files in the content path
 * - getMdxNode: Returns a single MDX node by slug
 * - getAllMdxNodes: Returns an array of all the MDX nodes
 * @example
 * // Create a source for blog posts
 * const BlogSource = createMdxSource({
 *   contentPath: 'content/posts',
 *   urlBase: '/posts',
 *   sortBy: 'date',
 *   sortOrder: 'desc',
 *   frontmatterSchema: z.object({
 *     title: z.string(),
 *     date: z.string(),
 *   }),
 * });
 * // Retrieve MDX files and nodes from the source
 * const { getAllMdxFiles, getMdxNode, getAllMdxNodes } = BlogSource;
 * const files = await getAllMdxFiles();
 * const post = await getMdxNode('my-post');
 * const posts = await getAllMdxNodes();
 */
export function createMdxSource<
  Z extends z.AnyZodObject,
  K extends keyof z.infer<Z>,
>(params: CreateSourceParams<Z, K>): MdxSource<z.infer<Z>> {
  const {
    contentPath,
    urlBase,
    sortBy,
    sortOrder,
    compareFn,
    frontmatterSchema,
    rehypePlugins,
  } = params;

  async function getAllMdxFiles() {
    const files = await glob(`${contentPath}/**/*.{md,mdx}`);

    if (!files.length) return [];

    return files.map((filepath) => {
      const slug = filepath
        .replace(contentPath, '')
        .replace(/^\/+/, '')
        .replace(new RegExp(path.extname(filepath) + '$'), '')
        .replace(/\/?index$/, '');

      const url = `${urlBase.replace(/\/$/, '')}/${slug}`;

      return {
        filepath,
        slug,
        url,
      } as MdxFile;
    });
  }

  async function getFileData(filepath: string) {
    const raw = await fs.readFile(filepath, 'utf-8');
    const hash = hasha(raw.toString());

    const cachedContent = mdxCache.get<MdxFileData<z.infer<Z>>>(hash);

    if (cachedContent?.hash === hash) {
      return cachedContent;
    }

    const serialized = await serialize(raw, {
      mdxOptions: { rehypePlugins },
      parseFrontmatter: true,
    });

    const frontmatter = frontmatterSchema.parse(serialized.frontmatter);

    const fileData = {
      raw,
      hash,
      frontmatter,
      serialized,
    } as MdxFileData<z.infer<Z>>;

    mdxCache.set(hash, fileData);

    return fileData;
  }

  async function getMdxNode(slug: string | string[]) {
    const _slug = Array.isArray(slug) ? slug.join('/') : slug;

    const files = await getAllMdxFiles();
    if (!files?.length) return null;

    const [file] = files.filter((file) => file.slug === _slug);
    if (!file) return null;

    const data = await getFileData(file.filepath);

    return {
      ...file,
      ...data,
    } as MdxNode<z.infer<Z>>;
  }

  async function getAllMdxNodes() {
    const files = await getAllMdxFiles();

    if (!files.length) return [];

    const nodes = (await Promise.all(
      files.map(async (file) => await getMdxNode(file.slug)),
    )) as Array<MdxNode<z.infer<Z>>>;

    const adjust = sortOrder === 'desc' ? -1 : 1;
    return nodes.sort((a, b) => {
      if (compareFn) {
        return compareFn(a.frontmatter[sortBy], b.frontmatter[sortBy]);
      }
      if (a.frontmatter[sortBy] < b.frontmatter[sortBy]) {
        return -1 * adjust;
      }
      if (a.frontmatter[sortBy] > b.frontmatter[sortBy]) {
        return 1 * adjust;
      }
      return 0;
    });
  }

  return {
    getAllMdxFiles,
    getMdxNode,
    getAllMdxNodes,
  };
}
