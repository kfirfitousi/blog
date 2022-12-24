import { type MdxNode } from './types';

/**
 * Mocks the function getMdxNode from mdx/index.ts
 * @param frontmatter frontmatter to be used in the post
 * @param slug slug to be used in the post
 * @returns a dummy post with the given frontmatter
 * @example
 * const dummyPost = getDummyPost({
 *  title: 'Dummy Post',
 *  excerpt: 'This is a dummy post',
 *  date: '2022-01-01',
 * });
 */
export function getDummyPost<Frontmatter extends Record<string, unknown>>(
  frontmatter: Frontmatter,
  slug?: string,
) {
  return {
    frontmatter,
    slug: slug || 'dummy-post',
    url: 'posts/dummy-post',
    filepath: 'dummy-post.mdx',
    raw: 'dummy-post',
    hash: 'dummy-post',
    serialized: {
      compiledSource: 'dummy-post',
    },
  } as MdxNode<Frontmatter>;
}

/**
 * Returns an array of dummy posts
 * @param generateFrontmatter function that generates the frontmatter for each post
 * @param count number of posts to be generated
 * @returns an array of dummy posts
 * @example
 * const dummyPosts = getDummyPosts((index) => ({
 *   title: `Dummy Post ${index}`,
 *   excerpt: `This is a dummy post ${index}`,
 *   date: '2022-01-01',
 * }), 5);
 */
export function getDummyPosts<Frontmatter extends Record<string, unknown>>(
  generateFrontmatter: (index: number) => Frontmatter,
  count: number,
): Array<MdxNode<Frontmatter>> {
  return Array.from({ length: count }, (_, index) =>
    getDummyPost(generateFrontmatter(index), `dummy-post-${index}`),
  );
}
