import { getDummyPost, getDummyPosts } from './dummy-post';

describe('getDummyPost', () => {
  it('should return a dummy post with the given frontmatter', () => {
    const dummyPost = getDummyPost({
      title: 'Dummy Post',
      excerpt: 'This is a dummy post',
    });

    expect(dummyPost).toHaveProperty('frontmatter', {
      title: 'Dummy Post',
      excerpt: 'This is a dummy post',
    });
  });
});

describe('getDummyPosts', () => {
  it('should return an array of dummy posts', () => {
    const dummyPosts = getDummyPosts(
      (index) => ({
        title: `Dummy Post ${index}`,
        excerpt: `This is a dummy post ${index}`,
        tags: ['test', `tag-${index}`],
      }),
      5,
    );

    expect(dummyPosts).toHaveLength(5);

    dummyPosts.forEach((post, index) => {
      expect(post).toHaveProperty('frontmatter', {
        title: `Dummy Post ${index}`,
        excerpt: `This is a dummy post ${index}`,
        tags: ['test', `tag-${index}`],
      });
    });
  });
});
