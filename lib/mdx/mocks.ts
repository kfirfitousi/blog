import { type MdxNode } from './types';

/**
 * Mocks the function getMdxNode
 * @param frontmatter frontmatter to be used in the post
 * @param slug slug to be used in the post
 * @returns a dummy post with the given frontmatter
 * @example
 * const dummyPost = getDummyPost({
 *   title: 'Dummy Post',
 *   excerpt: 'This is a dummy post',
 *   date: '2022-01-01',
 * });
 * @example
 * const dummyPost = getDummyPost(
 *   {
 *     title: 'Dummy Post',
 *     date: '2022-01-01',
 *   },
 *  'post-slug',
 * );
 */
export function getDummyPost<Frontmatter extends Record<string, unknown>>(
  frontmatter: Frontmatter,
  slug = 'dummy-post',
) {
  return {
    frontmatter,
    slug,
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
 * @param frontmatter frontmatter to be used in each post, or a function that
 * generates the frontmatter for each post
 * @param count number of posts to be generated
 * @param slugPrefix prefix to be used in the slug of each post
 * @returns an array of dummy posts
 * @example
 * const dummyPosts = getDummyPosts(5, (index) => ({
 *   title: `Dummy Post ${index}`,
 *   excerpt: `This is a dummy post ${index}`,
 *   date: '2022-01-01',
 * }));
 * @example
 * const dummyPosts = getDummyPosts(
 *   5,
 *   {
 *     title: 'Dummy Post',
 *     date: '2022-01-01',
 *   },
 *  'test-slug',
 * );
 */
export function getDummyPosts<Frontmatter extends Record<string, unknown>>(
  count: number,
  frontmatter: Frontmatter | ((index: number) => Frontmatter),
  slugPrefix = 'dummy-post',
): Array<MdxNode<Frontmatter>> {
  return Array.from({ length: count }, (_, index) =>
    getDummyPost(
      typeof frontmatter === 'function' ? frontmatter(index) : frontmatter,
      `${slugPrefix}-${index}`,
    ),
  );
}
