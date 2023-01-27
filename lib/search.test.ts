import { type Post } from 'contentlayer/generated';
import { dummyArray } from 'contentlayer-mock';

import { getTagsWithCount, searchPosts } from './search';

const posts = dummyArray<Post>(10, (index) => ({
  title: `Post ${index + 1}`,
  tags: ['tag', `tag${index + 1}`],
  excerpt: `Post ${index + 1} excerpt`,
  date: '2022-01-01',
  slug: `post-${index + 1}`,
  url: `post-${index + 1}`,
}));

describe('searchPosts', () => {
  it('should return the posts that best match the query', () => {
    const result = searchPosts('Post 1', posts);
    expect(result[0].title).toBe('Post 1');
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
