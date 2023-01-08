import { type MdxNode } from './types';

/**
 * Creates a dummy {@link MdxNode}.
 * @example
 * const dummyPost = getDummyNode({
 *   title: 'Dummy Post',
 *   excerpt: 'This is a dummy post',
 *   date: '2022-01-01',
 * });
 * @example
 * const dummyPost = getDummyNode(
 *   {
 *     title: 'Dummy Post',
 *     date: '2022-01-01',
 *   },
 *  'post-slug',
 * );
 */
export function getDummyNode<Frontmatter extends Record<string, unknown>>(
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
 * Creates an array of dummy {@link MdxNode}s.
 * @param frontmatter frontmatter to be used in each node, or a function that
 * generates the frontmatter for each node
 * @param count number of nodes to be generated
 * @param slugPrefix prefix to be used in the slug of each node
 * @example
 * const dummyPosts = getDummyNodes(5, (index) => ({
 *   title: `Dummy Post ${index}`,
 *   excerpt: `This is a dummy post ${index}`,
 *   date: '2022-01-01',
 * }));
 * @example
 * const dummyPosts = getDummyNodes(
 *   5,
 *   {
 *     title: 'Dummy Post',
 *     date: '2022-01-01',
 *   },
 *  'test-slug',
 * );
 */
export function getDummyNodes<Frontmatter extends Record<string, unknown>>(
  count: number,
  frontmatter: Frontmatter | ((index: number) => Frontmatter),
  slugPrefix = 'dummy-post',
): Array<MdxNode<Frontmatter>> {
  return Array.from({ length: count }, (_, index) =>
    getDummyNode(
      typeof frontmatter === 'function' ? frontmatter(index) : frontmatter,
      `${slugPrefix}-${index}`,
    ),
  );
}
