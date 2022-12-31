import { type BlogMdxNode } from '@/lib/mdx/sources';

/**
 * Search for a query in a text
 * @param query The query to search for
 * @param text The text to search in
 * @returns A boolean indicating whether the query was found in the text
 */
function searchHit(query: string, text: string) {
  return text.toLowerCase().includes(query.toLowerCase());
}

/**
 * Search for a query in a list of posts
 * @param query The query to search for
 * @param posts The posts to search in
 * @returns The posts that matched the query in descending order of relevance
 */
export function searchPosts(query: string, posts: Array<BlogMdxNode>) {
  const postsWithSearchHits = new Map<BlogMdxNode, number>();

  posts.forEach((post) => {
    if (!query) return;

    const {
      frontmatter: { title, excerpt, tags },
      raw,
    } = post;

    let searchHits = 0;

    if (tags.some((tag) => searchHit(query, tag))) {
      searchHits += 10; // give tag hits heavy weight
    }
    if (searchHit(query, title)) {
      searchHits += 10; // give title hits heavy weight
    }
    if (searchHit(query, excerpt)) {
      searchHits += 5; // give excerpt hits lighter weight
    }
    if (searchHit(query, raw)) {
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

/**
 * Get all tags with their count
 * @param posts The posts to get the tags from
 * @returns The tags with their count in descending order of count
 */
export function getTagsWithCount(posts: Array<BlogMdxNode>) {
  const tagsWithCount = new Map<string, number>();

  posts.forEach((post) => {
    const tags = post.frontmatter.tags;

    tags.forEach((tag) => {
      tagsWithCount.set(tag, (tagsWithCount.get(tag) ?? 0) + 1);
    });
  });

  return Array.from(tagsWithCount.entries()).sort(([, a], [, b]) => b - a);
}
