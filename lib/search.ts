import { type Post } from 'contentlayer/generated';

/**
 * Search for a query in a text.
 * @returns A boolean indicating whether the query was found in the text.
 */
function searchHit(query: string, text: string) {
  return text.toLowerCase().includes(query.toLowerCase());
}

/**
 * Search for a query in a list of posts.
 * @returns The posts that matched the query in descending order of relevance.
 */
export function searchPosts(query: string, posts: Array<Post>) {
  const postsWithSearchHits = new Map<Post, number>();

  posts.forEach((post) => {
    if (!query) return;

    const {
      title,
      excerpt,
      tags,
      body: { raw },
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
 * @returns The tags with their count in descending order of count
 */
export function getTagsWithCount(posts: Array<Post>) {
  const tagsWithCount = new Map<string, number>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagsWithCount.set(tag, (tagsWithCount.get(tag) ?? 0) + 1);
    });
  });

  return Array.from(tagsWithCount.entries()).sort(([, a], [, b]) => b - a);
}
