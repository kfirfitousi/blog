import { promises as fs } from "fs";
import z from "zod";
import hasha from "hasha";
import glob from "fast-glob";
import path from "path";
import NodeCache from "node-cache";
import { VFile } from "vfile";
import { matter } from "vfile-matter";

const mdxCache = new NodeCache();

export interface Source<TFrontmatter extends z.ZodType> {
  contentPath: string;
  basePath: string;
  sortBy: keyof z.infer<TFrontmatter>;
  sortOrder: "asc" | "desc";
  frontMatter: TFrontmatter;
}

interface MdxFile {
  filepath: string;
  slug: string;
  url: string;
}

interface MdxFileData<TFrontmatter extends z.ZodType> {
  raw: string;
  hash: string;
  frontMatter: TFrontmatter;
  content: string;
}

export function createMdxSource<TFrontmatter extends z.ZodType>(
  source: Source<TFrontmatter>
) {
  const { contentPath, basePath, sortBy, sortOrder } = source;

  async function getMdxFiles() {
    const files = await glob(`${contentPath}/**/*.{md,mdx}`);

    if (!files.length) return [];

    return files.map((filepath) => {
      let slug = filepath
        .replace(contentPath, "")
        .replace(/^\/+/, "")
        .replace(new RegExp(path.extname(filepath) + "$"), "");

      slug = slug.replace(/\/?index$/, "");

      return {
        filepath,
        slug,
        url: `${basePath?.replace(/\/$/, "")}/${slug}`,
      };
    });
  }

  async function getFileData(
    file: MdxFile
  ): Promise<MdxFileData<z.infer<TFrontmatter>>> {
    const raw = await fs.readFile(file.filepath, "utf-8");
    const hash = hasha(raw.toString());

    const cachedContent =
      mdxCache.get<MdxFileData<z.infer<TFrontmatter>>>(hash);
    if (cachedContent?.hash === hash) {
      return cachedContent;
    }

    const vfile = new VFile({ value: raw });
    matter(vfile, { strip: true });

    const frontMatter = source.frontMatter.parse(
      vfile.data.matter
    ) as z.infer<TFrontmatter>;

    const fileData = {
      raw,
      frontMatter,
      hash,
      content: String(vfile.value),
    };

    mdxCache.set(hash, fileData);

    return fileData;
  }

  async function getMdxNode(slug: string | string[]) {
    const _slug = Array.isArray(slug) ? slug.join("/") : slug;

    const files = await getMdxFiles();
    if (!files?.length) return null;

    const [file] = files.filter((file) => file.slug === _slug);
    if (!file) return null;

    const data = await getFileData(file);

    return {
      ...file,
      ...data,
    };
  }

  async function getAllMdxNodes() {
    const files = await getMdxFiles();

    if (!files.length) return [];

    const nodes = await Promise.all(
      files.map(async (file) => {
        return await getMdxNode(file.slug);
      })
    );

    const adjust = sortOrder === "desc" ? -1 : 1;
    return nodes.sort((a, b) => {
      if (!a || !b) return 0;
      if (a.frontMatter[sortBy] < b.frontMatter[sortBy]) {
        return -1 * adjust;
      }
      if (a.frontMatter[sortBy] > b.frontMatter[sortBy]) {
        return 1 * adjust;
      }
      return 0;
    });
  }

  return {
    getMdxFiles,
    getFileData,
    getMdxNode,
    getAllMdxNodes,
  };
}

const BlogSource = createMdxSource({
  contentPath: "content/blog",
  basePath: "/blog",
  sortBy: "date",
  sortOrder: "desc",
  frontMatter: z.object({
    title: z.string(),
    date: z.string(),
    excerpt: z.string(),
    tags: z.array(z.string()),
  }),
});

export default BlogSource;

export type MdxNode = Awaited<ReturnType<typeof BlogSource.getMdxNode>>;
