import { BlogMdxNode } from "./mdx-sources";

export function searchPosts(query: string, posts: BlogMdxNode[]) {
  const postsWithSearchHits = new Map<BlogMdxNode, number>();

  posts.forEach((post) => {
    if (!query) return;

    const { frontmatter, raw } = post;
    let searchHits = 0;

    if (
      frontmatter.tags.some((tag) =>
        tag.toLowerCase().includes(query.toLowerCase())
      )
    ) {
      searchHits += 10; // give tag hits heavy weight
    }

    if (frontmatter.title.toLowerCase().includes(query.toLowerCase())) {
      searchHits += 10; // give title hits heavy weight
    }

    if (frontmatter.excerpt.toLowerCase().includes(query.toLowerCase())) {
      searchHits += 5; // give excerpt hits lighter weight
    }

    if (raw.toLowerCase().includes(query.toLowerCase())) {
      searchHits++; // give content hits lightest weight
    }

    if (searchHits > 0) {
      postsWithSearchHits.set(post, searchHits);
    }
  });

  return Array.from(postsWithSearchHits.entries())
    .sort(([, a], [, b]) => b - a)
    .map(([post]) => post);
}

export function getTagsWithCount(posts: BlogMdxNode[]) {
  const tagsWithCount = new Map<string, number>();

  posts.forEach((post) => {
    const tags = post.frontmatter.tags;

    tags.forEach((tag) => {
      tagsWithCount.set(tag, (tagsWithCount.get(tag) ?? 0) + 1);
    });
  });

  return Array.from(tagsWithCount.entries()).sort(([, a], [, b]) => b - a);
}
