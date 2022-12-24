import type {
  CreateSourceParams,
  MdxFileData,
  MdxFile,
  MdxNode,
  MdxSource,
} from './types';
import { serialize } from 'next-mdx-remote/serialize';
import { rehypePlugins } from './plugins';
import { promises as fs } from 'fs';
import NodeCache from 'node-cache';
import glob from 'fast-glob';
import hasha from 'hasha';
import path from 'path';
import z from 'zod';

const mdxCache = new NodeCache();

/**
 * Creates a source object that contains methods for retrieving mdx files and nodes.
 * @param params A {@link CreateSourceParams} object that contains the content path, url base, sort by, and sort order
 * as well as the frontmatter schema.
 * @returns An {@link MdxSource} object containing the following methods:
 * - getAllMdxFiles: Returns an array of all the mdx files in the content path
 * - getMdxNode: Returns a single mdx node by slug
 * - getAllMdxNodes: Returns an array of all the mdx nodes
 * @example
 * const source = {
 *   contentPath: 'content/posts',
 *   urlBase: '/posts',
 *   sortBy: 'date',
 *   sortOrder: 'desc',
 *   frontmatterSchema: z.object({
 *     title: z.string(),
 *     date: z.string(),
 *   }),
 * };
 * const { getAllMdxFiles, getMdxNode, getAllMdxNodes } = createMdxSource(source);
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
      files.map(async (file) => {
        return await getMdxNode(file.slug);
      }),
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
