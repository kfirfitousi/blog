import { searchPosts, getTagsWithCount } from './search';
import { getDummyPost } from '@/lib/dummy-post';

const posts = Array.from({ length: 10 }, (_, i) =>
  getDummyPost({
    title: `Post ${i + 1}`,
    tags: ['tag', `tag${i + 1}`],
    excerpt: `Post ${i + 1} excerpt`,
    date: '2022-01-01',
  }),
);

describe('searchPosts', () => {
  it('should return the posts that best match the query', () => {
    const result = searchPosts('Post 1', posts);
    expect(result[0].frontmatter.title).toBe('Post 1');
  });

  it('should return no posts if the query is empty', () => {
    const result = searchPosts('', posts);
    expect(result).toHaveLength(0);
  });
});

describe('getTagsWithCount', () => {
  it('should return the tags with their count', () => {
    const tagsWithCount = getTagsWithCount(posts);
    expect(tagsWithCount).toContainEqual(['tag', 10]);
    expect(tagsWithCount).toContainEqual(['tag1', 1]);
    expect(tagsWithCount).toContainEqual(['tag10', 1]);
  });
});
