'use client';

import Link from 'next/link';
import { type Post } from 'contentlayer/generated';
import Balancer from 'react-wrap-balancer';

import { useSearchStore } from '@/stores/search-store';
import { formatDateTime } from '@/lib/datetime';
import { cn } from '@/lib/utils';

type SearchResultsProps = {
  query: string;
  results: Post[];
};

export function SearchResults({ query, results }: SearchResultsProps) {
  const toggleSearch = useSearchStore((state) => state.toggleSearch);

  return (
    <ul className="flex flex-col overflow-scroll">
      {results.map((post) => {
        const publishedDate = formatDateTime(post.date);

        return (
          <li
            key={post.slug}
            className={cn(
              'rounded p-2 transition-none sm:px-8',
              'even:bg-slate-400/30 hover:bg-slate-500/50',
              'dark:even:bg-slate-700/60 dark:hover:bg-slate-400/40',
            )}
          >
            <Link
              href={post.url}
              onClick={toggleSearch}
              className="flex h-fit flex-col"
            >
              <span className="font-semibold text-slate-800 dark:text-rose-50 sm:text-xl">
                <Balancer>{highlightSearchQuery(query, post.title)}</Balancer>
              </span>
              <span className="text-sm text-slate-700 dark:text-rose-50 sm:text-base">
                {highlightSearchQuery(query, post.excerpt)}
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-300">
                {publishedDate.asString} · {publishedDate.asRelativeTimeString}
              </span>
            </Link>
          </li>
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
