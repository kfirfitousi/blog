import { getDummyNode, getDummyNodes } from './mocks';

describe('getDummyNode', () => {
  it('should return a dummy node with the given frontmatter', () => {
    const dummyNode = getDummyNode({
      title: 'Example Post',
      excerpt: 'This is an example post',
    });

    expect(dummyNode).toHaveProperty('frontmatter', {
      title: 'Example Post',
      excerpt: 'This is an example post',
    });
  });

  it('should return a dummy node with the given slug', () => {
    const dummyNode = getDummyNode(
      {
        title: 'Example Post',
      },
      'test-slug',
    );

    expect(dummyNode).toHaveProperty('slug', 'test-slug');
  });
});

describe('getDummyNodes', () => {
  it('should return an array of dummy nodes', () => {
    const dummyNodes = getDummyNodes(5, (index) => ({
      title: `Example Post ${index}`,
      excerpt: `This is a example post ${index}`,
      tags: ['test', `tag-${index}`],
    }));

    expect(dummyNodes).toHaveLength(5);

    dummyNodes.forEach((post, index) => {
      expect(post).toHaveProperty('frontmatter', {
        title: `Example Post ${index}`,
        excerpt: `This is a example post ${index}`,
        tags: ['test', `tag-${index}`],
      });
    });
  });

  it('should give a unique slug to each node', () => {
    const dummyNodes = getDummyNodes(5, { title: 'Example Post' }, 'test-slug');

    const slugs = dummyNodes.map((node) => node.slug);

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
    const dummyNodes = getDummyNodes(0, {
      title: 'Example Post',
    });

    expect(dummyNodes).toHaveLength(0);
  });
});
