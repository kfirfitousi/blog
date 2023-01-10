import type { Document, MDX } from 'contentlayer/dist/core';

type MdxDocument = Document & {
  body: MDX;
  type: string;
};

type Fields<D extends MdxDocument> = Omit<D, '_id' | '_raw' | 'body' | 'type'>;

/**
 * Generates a dummy MDX document with the given fields, matching the given type.
 * @param fields - The fields to set on the dummy document.
 * @param id - The id of the dummy document. Defaults to 'dummy'.
 * @param type - The type of the dummy document. Defaults to 'Post'.
 * @example
 * import { type Post } from 'contentlayer/generated';
 *
 * const post = dummy<Post>(
 *   {
 *     title: 'Example Post',
 *     date: '2023-01-01',
 *   },
 *   'example-post',
 *   'Post'
 * );
 */
export function dummy<D extends MdxDocument>(
  fields: Fields<D>,
  id = 'dummy',
  type = 'Post',
): D {
  return {
    _id: id,
    _raw: {},
    body: {
      code: '',
      raw: 'dummy document raw content',
    },
    type,
    ...fields,
  } as D;
}

/**
 * Generates an array of dummy MDX documents with the given fields, matching the given type.
 * @param count - The number of dummy documents to generate. Defaults to 1.
 * @param fields - The fields to set on the dummy documents. Can be a function that returns the fields for each document.
 * @param type - The type of the dummy documents. Defaults to 'Post'.
 * @example
 * import { type Post } from 'contentlayer/generated';
 *
 * const posts = dummies<Post>(10, (index) => ({
 *   title: `Post ${index + 1}`,
 *   date: '2023-01-01',
 * }));
 */
export function dummies<D extends MdxDocument>(
  count = 1,
  fields: ((index: number) => Fields<D>) | Fields<D>,
  type = 'Post',
) {
  return Array.from({ length: count }, (_, index) => {
    if (typeof fields === 'function') {
      return dummy(fields(index), index.toString(), type);
    }

    return dummy(fields);
  });
}
