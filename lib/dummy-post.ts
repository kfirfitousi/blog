import { MdxFile, MdxFileData } from '@/lib/mdx';

/**
 * Mocks the function getMdxNode from lib/mdx.ts
 * @param frontmatter frontmatter to be used in the post
 * @returns a dummy post with the given frontmatter
 * @example
 * const dummyPost = getDummyPost({
 *  title: 'Dummy Post',
 *  excerpt: 'This is a dummy post',
 *  date: '2022-01-01',
 * });
 */
export function getDummyPost<TFrontmatter>(
  frontmatter: TFrontmatter,
): MdxFile & MdxFileData<TFrontmatter> {
  return {
    frontmatter,
    slug: 'dummy-post',
    url: 'posts/dummy-post',
    filepath: 'dummy-post.mdx',
    raw: 'dummy-post',
    hash: 'dummy-post',
    serialized: {
      compiledSource: 'dummy-post',
    },
  };
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
export function getDummyPosts<TFrontmatter>(
  generateFrontmatter: (index: number) => TFrontmatter,
  count: number,
): Array<MdxFile & MdxFileData<TFrontmatter>> {
  return Array.from({ length: count }, (_, index) =>
    getDummyPost(generateFrontmatter(index)),
  );
}
