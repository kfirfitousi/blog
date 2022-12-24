import { type MDXRemoteSerializeResult } from 'next-mdx-remote';
import z from 'zod';

/**
 * Parameters used to create a source object.
 * @template Z The zod schema used to validate the frontmatter of the MDX files.
 * @template K The key used to sort the MDX files.
 */
export type CreateSourceParams<
  Z extends z.ZodType,
  K extends keyof z.infer<Z>,
> = {
  /**
   * The path to the content directory, where the MDX files are located.
   * This path is relative to the root of the project.
   * @example 'content/posts'
   * @example 'content/blog'
   */
  contentPath: string;
  /**
   * The base URL from which the MDX files are served.
   * @example '/blog'
   * @example '/posts'
   * @example '/acme/docs'
   */
  urlBase: string;
  /**
   * The key used to sort the MDX files. This key must be present in the
   * frontmatter schema. If the type of the key is neither `string` nor `number`,
   * a `compareFn` should be provided to compare the values of the key.
   */
  sortBy: K;
  /**
   * The order in which the MDX files are sorted.
   * @example 'asc'
   * @example 'desc'
   */
  sortOrder: 'asc' | 'desc';
  /**
   * A function used to compare the values of the sort key. If not provided,
   * the values are compared using the operators `<` and `>`.
   * @example
   * (a, b) => a.localeCompare(b)
   * @example
   * (a, b) => a - b
   */
  compareFn?: (a: z.infer<Z>[K], b: z.infer<Z>[K]) => number;
  /**
   * The zod schema used to validate the frontmatter of the MDX files.
   * @example
   * z.object({
   *   title: z.string(),
   *   date: z.string()
   * })
   * @example
   * z.object({
   *   title: z.string(),
   *   description: z.string()
   * })
   */
  frontmatterSchema: Z;
};

/**
 * An object containing the MDX file path, slug, and URL.
 */
export type MdxFile = {
  /**
   * The path to the MDX file relative to the root of the project.
   */
  filepath: string;
  /**
   * The slug of the MDX file, which is the path to the file relative to the
   * content directory, excluding the file extension and the index file.
   * @example
   * '<contentPath>/my-post.mdx' -> 'my-post'
   * '<contentPath>/my-post/index.mdx' -> 'my-post'
   * '<contentPath>/my-topic/my-post.mdx' -> 'my-topic/my-post'
   */
  slug: string;
  /**
   * The relative URL where the MDX file is served from.
   * @example
   * '<urlBase>/my-post'
   * '<urlBase>/my-topic/my-post'
   */
  url: string;
};

/**
 * An object containing the raw content of the MDX file, the hash of the MDX
 * file, the frontmatter parsed from the MDX file, and the MDX serialized
 * content.
 * @template T The type of the frontmatter. This can be a zod schema or an
 * object.
 */
export type MdxFileData<T> = {
  /**
   * The raw content of the MDX file.
   */
  raw: string;
  /**
   * The hash of the MDX file.
   */
  hash: string;
  /**
   * The frontmatter parsed from the MDX file.
   */
  frontmatter: T extends infer S extends z.ZodType
    ? z.infer<S>
    : T extends Record<string, unknown>
    ? T
    : never;
  /**
   * The MDX serialized content, to be used with `<MDXRemote />`.
   */
  serialized: MDXRemoteSerializeResult;
};

/**
 * A type that represents an MDX file with its data (frontmatter and serialized
 * MDX content).
 * @template T The type of the frontmatter. This can be a zod schema or an
 * object.
 * @example
 * // using an object
 * type MyMdxNode = MdxNode<{
 *   title: string;
 *   date: string;
 * }>;
 * // equivalent to:
 * type MyMdxNode = MdxFile & MdxFileData<{
 *   title: string;
 *   date: string;
 * }>
 * @example
 * // using a frontmatter schema
 * blogSchema = z.object({
 *   title: z.string(),
 * });
 * type BlogMdxNode = MdxNode<typeof blogSchema>;
 * // equivalent to:
 * type BlogMdxNode = MdxFile & MdxFileData<{
 *   title: string;
 * }>
 */
export type MdxNode<T> = MdxFile & MdxFileData<T>;

/**
 * A type that represents a source of MDX files.
 * It provides methods to retrieve the MDX files and their data.
 * @template T The type of the frontmatter. This can be a zod schema or an
 * object.
 */
export type MdxSource<T> = {
  /**
   * Retrieves all the MDX files in the source's content directory.
   * Does not retrieve the MDX files' data.
   * @returns An array of {@link MdxFile} objects.
   * @example
   * const files = await getAllMdxFiles()
   */
  getAllMdxFiles: () => Promise<MdxFile[]>;
  /**
   * Retrieves the MDX node with the given slug.
   * @param slug The slug of the MDX node to retrieve. Nested slugs can be
   * provided as an array of strings.
   * @returns An {@link MdxNode} object, or `null` if the MDX node does not exist.
   * @example
   * const post = await getMdxNode('my-post')
   * const post = await getMdxNode(['my-topic', 'my-post'])
   */
  getMdxNode: (slug: string | string[]) => Promise<MdxNode<T> | null>;
  /**
   * Retrieves all the MDX nodes in the source's content directory.
   * @returns An array of {@link MdxNode} objects.
   * @example
   * const posts = await getAllMdxNodes()
   */
  getAllMdxNodes: () => Promise<MdxNode<T>[]>;
};
