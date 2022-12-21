'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchStore } from '@/stores/search-store';
import { useThemeStore } from '@/stores/theme-store';
import { type BlogMdxNode } from '@/lib/mdx-sources';
import { getTagsWithCount, searchPosts } from '@/lib/search';
import { parseDate } from '@/lib/datetime';
import { ChevronUp, X } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

type SearchProps = {
  posts: BlogMdxNode[];
};

export function Search({ posts }: SearchProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const isSearching = useSearchStore((state) => state.isSearching);
  const toggleSearch = useSearchStore((state) => state.toggleSearch);
  const isSerif = useThemeStore((state) => state.isSerif);

  useEffect(() => {
    isSearching && inputRef.current?.focus();
  }, [isSearching]);

  const tagsWithCounts = useMemo(() => getTagsWithCount(posts), [posts]);
  const searchResults = useMemo(
    () => searchPosts(query, posts),
    [query, posts],
  );

  if (!isSearching) return null;

  return (
    <section
      className={clsx(
        isSerif && 'font-serif',
        'fixed left-1/2 top-1/2 z-50 flex h-fit max-h-[80vh] w-5/6 max-w-3xl -translate-x-1/2 -translate-y-1/2 flex-col rounded-md border-2 border-slate-300 bg-slate-200 bg-opacity-60 p-4 backdrop-blur-md dark:border-slate-500 dark:bg-slate-600 dark:bg-opacity-70',
      )}
    >
      <div className="mb-2 flex h-fit flex-row items-center">
        <input
          ref={inputRef}
          type="text"
          className={clsx(
            searchResults.length > 0 ? 'sm:text-2xl' : 'sm:text-4xl',
            'w-full rounded border border-slate-400 bg-slate-100 px-2 text-slate-700 placeholder:opacity-50 dark:border-slate-500 dark:bg-slate-700 dark:text-rose-50',
          )}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search Posts"
          placeholder={
            placeholders[Math.floor(Math.random() * placeholders.length)]
          }
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className={clsx(
              searchResults.length > 0 ? 'sm:top-5' : 'sm:top-7',
              'absolute top-[1.1rem] right-12 sm:right-14',
            )}
          >
            <X
              className="h-6 w-6 text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400"
              aria-label="Clear"
            />
          </button>
        )}
        <button onClick={toggleSearch}>
          <ChevronUp
            className="ml-2 h-6 w-6 text-slate-400 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400"
            aria-label="Close Search"
          />
        </button>
      </div>

      <ul className="flex flex-col overflow-scroll">
        {searchResults.map((post) => {
          const { formattedDate, relativeTime } = parseDate(
            post.frontmatter.date,
          );

          return (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="flex h-fit flex-col rounded p-2 transition-none even:bg-slate-400 even:bg-opacity-30 hover:bg-slate-500 hover:bg-opacity-50 dark:even:bg-slate-700 dark:even:bg-opacity-60 dark:hover:bg-slate-400 dark:hover:bg-opacity-40 sm:px-8"
              onClick={toggleSearch}
            >
              <span className="font-semibold text-slate-800 dark:text-rose-50 sm:text-xl">
                {highlightSearchQuery(query, post.frontmatter.title)}
              </span>
              <span className="text-sm text-slate-700 dark:text-rose-50 sm:text-base">
                {highlightSearchQuery(query, post.frontmatter.excerpt)}
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-300">
                {formattedDate} · {relativeTime}
              </span>
            </Link>
          );
        })}
      </ul>

      {searchResults.length > 0 && (
        <hr className="my-2 hidden border-slate-400  dark:border-slate-600 sm:block" />
      )}

      <div
        className={clsx(
          searchResults.length > 0
            ? 'max-xs:hidden sm:text-base'
            : 'sm:text-lg',
          'my-2 flex h-fit flex-row flex-wrap items-center justify-center space-x-4 space-y-1 text-sm',
        )}
      >
        {tagsWithCounts.map(([tag, count]) => (
          <button
            key={tag}
            onClick={() => setQuery(tag)}
            className="flex w-fit flex-row items-baseline space-x-0.5"
          >
            <span className="text-rose-700 hover:text-rose-900 dark:text-rose-200 dark:hover:text-rose-100">
              #{tag}
            </span>
            <span className="font-mono text-xs text-slate-600 dark:text-slate-300">
              ({count})
            </span>
          </button>
        ))}
      </div>

      <div className="absolute bottom-1 left-2 text-xs text-slate-600 dark:text-slate-200 max-sm:hidden">
        Toggle with ⌘+K or Ctrl+K
      </div>
    </section>
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
/**
 * Placeholders for the search input
 */
const placeholders = [
  'What are you looking for?',
  'Something need doing?',
  'Looking for something specific?',
  'Looking for something special?',
  'Ah, I have just the thing for you.',
  'What brings you here?',
  'Whatcha lookin for?',
  "You need somethin'?",
  'I got what you need!',
  'Yeah, what do you want?',
  'What do you require?',
  'I have exactly what you need.',
  'What can I get for ya today?',
  'May you find what you seek.',
  "I hope you'll find something useful!",
  'Feel free to browse.',
];
