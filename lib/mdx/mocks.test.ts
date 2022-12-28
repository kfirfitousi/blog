import { getDummyPost, getDummyPosts } from './mocks';

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

  it('should return a dummy post with the given slug', () => {
    const dummyPost = getDummyPost(
      {
        title: 'Dummy Post',
      },
      'test-slug',
    );

    expect(dummyPost).toHaveProperty('slug', 'test-slug');
  });
});

describe('getDummyPosts', () => {
  it('should return an array of dummy posts', () => {
    const dummyPosts = getDummyPosts(5, (index) => ({
      title: `Dummy Post ${index}`,
      excerpt: `This is a dummy post ${index}`,
      tags: ['test', `tag-${index}`],
    }));

    expect(dummyPosts).toHaveLength(5);

    dummyPosts.forEach((post, index) => {
      expect(post).toHaveProperty('frontmatter', {
        title: `Dummy Post ${index}`,
        excerpt: `This is a dummy post ${index}`,
        tags: ['test', `tag-${index}`],
      });
    });
  });

  it('should give a unique slug to each post', () => {
    const dummyPosts = getDummyPosts(5, { title: 'Dummy Post' }, 'test-slug');

    const slugs = dummyPosts.map((post) => post.slug);

    expect(slugs).toHaveLength(5);
    expect(slugs).toEqual(
      expect.arrayContaining([
        'test-slug-0',
        'test-slug-1',
        'test-slug-2',
        'test-slug-3',
        'test-slug-4',
      ]),
    );
  });

  it('should return an empty array if count is 0', () => {
    const dummyPosts = getDummyPosts(0, {
      title: 'Dummy Post',
    });

    expect(dummyPosts).toHaveLength(0);
  });
});
