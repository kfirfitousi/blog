'use client';

import { type Post } from 'contentlayer/generated';
import { useSearchStore } from '@/stores/search-store';
import { formatDateTime } from '@/lib/datetime';
import Link from 'next/link';

type SearchResultsProps = {
  query: string;
  results: Post[];
};

export function SearchResults({ query, results }: SearchResultsProps) {
  const toggleSearch = useSearchStore((state) => state.toggleSearch);

  return (
    <ul className="flex flex-col overflow-scroll">
      {results.map((post) => {
        const dateTime = formatDateTime(post.date);

        return (
          <Link
            key={post.slug}
            href={post.url}
            onClick={toggleSearch}
            className="flex h-fit flex-col rounded p-2 transition-none even:bg-slate-400 even:bg-opacity-30
            hover:bg-slate-500 hover:bg-opacity-50 dark:even:bg-slate-700 dark:even:bg-opacity-60
            dark:hover:bg-slate-400 dark:hover:bg-opacity-40 sm:px-8"
          >
            <span className="font-semibold text-slate-800 dark:text-rose-50 sm:text-xl">
              {highlightSearchQuery(query, post.title)}
            </span>
            <span className="text-sm text-slate-700 dark:text-rose-50 sm:text-base">
              {highlightSearchQuery(query, post.excerpt)}
            </span>
            <span className="text-sm text-slate-600 dark:text-slate-300">
              {dateTime.asString} · {dateTime.asRelativeTimeString}
            </span>
          </Link>
        );
      })}
    </ul>
  );
}

/**
 * Highlights the search query in the text by wrapping it in a span with the
 * font-extrabold class.
 * @param query The search query
 * @param text The text to highlight
 * @returns The text with the query highlighted
 */
function highlightSearchQuery(query: string, text: string) {
  const sanitizedQuery = query.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  return text.split(new RegExp(`(${sanitizedQuery})`, 'gi')).map((part, i) => (
    <span
      key={i}
      className={
        part.toLowerCase() === query.toLowerCase()
          ? 'font-extrabold'
          : undefined
      }
    >
      {part}
    </span>
  ));
}
