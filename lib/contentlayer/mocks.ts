import type { DocumentMeta, MDX } from 'contentlayer/dist/core';

interface MdxDocument extends DocumentMeta {
  [key: string]: any;
  body: MDX;
  type: string;
}

type Fields<D extends MdxDocument> = Omit<D, '_id' | '_raw' | 'body' | 'type'>;

type DeepPartial<T> = T extends Record<string, unknown>
  ? Partial<{ [P in keyof T]: DeepPartial<T[P]> }>
  : T;

/**
 * Generates a dummy MDX document with the given fields and properties, matching the given type.
 * @param fields - The fields to set on the dummy document.
 * @param properties - The properties to set on the dummy document.
 * @example
 * import { type Post } from 'contentlayer/generated';
 *
 * const post = dummy<Post>(
 *   {
 *     title: 'Example Post',
 *     date: '2023-01-01',
 *     slug: 'example-post',
 *   },
 *   {
 *     _id: 'example-post',
 *     flattenedPath: 'posts/example-post',
 *   }
 * );
 */
export function dummy<D extends MdxDocument>(
  fields: Fields<D>,
  properties?: DeepPartial<D>,
) {
  return {
    _id: properties?._id || 'dummy',
    _raw: {
      contentType: 'mdx',
      flattenedPath: 'posts/dummy',
      sourceFileDir: 'posts',
      sourceFileName: 'dummy-post.mdx',
      sourceFilePath: 'posts/dummy-post.mdx',
      ...properties?._raw,
    } as D['_raw'],
    body: {
      code: '',
      raw: 'dummy document raw content',
      ...properties?.body,
    },
    type: properties?.type || 'dummy',
    ...fields,
  } as D;
}

/**
 * Generates an array of dummy MDX documents with the given fields and properties, matching the given type.
 * @param count - The number of dummy documents to generate.
 * @param fields - The fields to set on the dummy documents. Can be a function that returns the fields for each document.
 * @param properties - The properties to set on the dummy documents. Can be a function that returns the properties for each document.
 * @example
 * import { type Post } from 'contentlayer/generated';
 *
 * const posts = dummies<Post>(
 *   10,
 *   (index) => ({
 *     title: `Post ${index + 1}`,
 *     date: '2022-01-01',
 *   }),
 *   (index) => ({
 *     _id: `post-${index + 1}`,
 *     raw: 'raw content',
 *   }),
 * );
 */
export function dummies<D extends MdxDocument>(
  count: number,
  fields: Fields<D> | ((index: number) => Fields<D>),
  properties?: DeepPartial<D> | ((index: number) => DeepPartial<D>),
) {
  return Array.from({ length: count }, (_, index) => {
    return dummy(
      typeof fields === 'function' ? fields(index) : fields,
      typeof properties === 'function' ? properties(index) : properties,
    );
  });
}
