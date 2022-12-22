import { MdxFile, MdxFileData } from '@/lib/mdx';

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
      scope: {},
    },
  };
}
