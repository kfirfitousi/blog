import { type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { rehypePlugins } from '@/lib/mdx-plugins';
import { promises as fs } from 'fs';
import NodeCache from 'node-cache';
import glob from 'fast-glob';
import hasha from 'hasha';
import path from 'path';
import z from 'zod';

const mdxCache = new NodeCache();

export interface Source<FrontmatterSchema extends z.ZodType> {
  contentPath: string;
  basePath: string;
  sortBy: keyof z.infer<FrontmatterSchema>;
  sortOrder: 'asc' | 'desc';
  frontmatterScehma: FrontmatterSchema;
}

export interface MdxFile {
  filepath: string;
  slug: string;
  url: string;
}

export interface MdxFileData<TFrontmatter> {
  raw: string;
  hash: string;
  frontmatter: TFrontmatter;
  serialized: MDXRemoteSerializeResult;
}

export function createMdxSource<TFrontmatterScehma extends z.ZodType>(
  source: Source<TFrontmatterScehma>,
) {
  const { contentPath, basePath, sortBy, sortOrder } = source;
  type TFrontmatter = z.infer<TFrontmatterScehma>;

  async function getAllMdxFiles() {
    const files = await glob(`${contentPath}/**/*.{md,mdx}`);

    if (!files.length) return [];

    return files.map((filepath) => {
      const slug = filepath
        .replace(contentPath, '')
        .replace(/^\/+/, '')
        .replace(new RegExp(path.extname(filepath) + '$'), '')
        .replace(/\/?index$/, '');

      const url = `${basePath.replace(/\/$/, '')}/${slug}`;

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

    const cachedContent = mdxCache.get<MdxFileData<TFrontmatter>>(hash);
    if (cachedContent?.hash === hash) {
      return cachedContent;
    }

    const serialized = await serialize(raw, {
      mdxOptions: { rehypePlugins },
      parseFrontmatter: true,
    });

    const frontmatter = source.frontmatterScehma.parse(serialized.frontmatter);

    const fileData = {
      raw,
      hash,
      frontmatter,
      serialized,
    } as MdxFileData<TFrontmatter>;

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
    } as MdxFile & MdxFileData<TFrontmatter>;
  }

  async function getAllMdxNodes() {
    const files = await getAllMdxFiles();

    if (!files.length) return [];

    const nodes = (await Promise.all(
      files.map(async (file) => {
        return await getMdxNode(file.slug);
      }),
    )) as Array<MdxFile & MdxFileData<TFrontmatter>>;

    const adjust = sortOrder === 'desc' ? -1 : 1;
    return nodes.sort((a, b) => {
      if (!a || !b) return 0;
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
    getFileData,
    getMdxNode,
    getAllMdxNodes,
  };
}
