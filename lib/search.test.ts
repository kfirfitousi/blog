import { type Post } from 'contentlayer/generated';
import { dummyArray } from 'contentlayer-mock';
import { describe, expect, it } from 'vitest';

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
  it('returns the posts that best match the query', () => {
    expect(searchPosts('Post 7', posts)[0].title).toBe('Post 7');
    expect(searchPosts('tag4', posts)[0].title).toBe('Post 4');
  });

  it('returns no posts if the query is empty', () => {
    expect(searchPosts('', posts)).toHaveLength(0);
  });
});

describe('getTagsWithCount', () => {
  it('returns the tags with their count', () => {
    const tagsWithCount = getTagsWithCount(posts);
    expect(tagsWithCount).toContainEqual(['tag', 10]);
    expect(tagsWithCount).toContainEqual(['tag1', 1]);
    expect(tagsWithCount).toContainEqual(['tag10', 1]);
  });
});
