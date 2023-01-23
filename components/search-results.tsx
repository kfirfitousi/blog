'use client';

import { type Post } from 'contentlayer/generated';
import { useSearchStore } from '@/stores/search-store';
import { formatDateTime } from '@/lib/datetime';
import { cn } from '@/lib/utils';
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
            className={cn(
              'flex h-fit flex-col rounded p-2 transition-none sm:px-8',
              'even:bg-slate-400/30 hover:bg-slate-500/50',
              'dark:even:bg-slate-700/60 dark:hover:bg-slate-400/40',
            )}
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
