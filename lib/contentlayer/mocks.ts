import { type DocumentMeta } from 'contentlayer/dist/core';

type Document = {
  body: { code: string; raw: string };
  type: string;
} & DocumentMeta;

type Fields<T extends Document> = Omit<T, '_id' | '_raw' | 'body' | 'type'>;

export function dummy<T extends Document>(
  fields: Fields<T>,
  id = 'dummy',
  type = 'Post',
): T {
  const t = {
    _id: id,
    _raw: {},
    body: {
      code: '',
      raw: 'dummy post body',
    },
    type,
    ...fields,
  } as T;

  return t;
}

export function dummies<T extends Document>(
  count = 1,
  fields: ((index: number) => Fields<T>) | Fields<T>,
) {
  return Array.from({ length: count }, (_, index) => {
    if (typeof fields === 'function') {
      return dummy(fields(index), index.toString());
    }

    return dummy(fields);
  });
}
