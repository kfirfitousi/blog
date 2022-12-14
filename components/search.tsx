'use client';

import { type BlogMdxNode } from '@/lib/mdx/sources';
import { useEffect, useMemo } from 'react';
import { useSearchStore } from '@/stores/search-store';
import { useThemeStore } from '@/stores/theme-store';
import { searchPosts } from '@/lib/search';
import { SearchInput } from '@/components/search-input';
import { SearchResults } from '@/components/search-results';
import { SearchTags } from '@/components/search-tags';
import { ChevronUp } from 'lucide-react';
import shallow from 'zustand/shallow';
import clsx from 'clsx';

type SearchProps = {
  posts: BlogMdxNode[];
};

export function Search({ posts }: SearchProps) {
  const isSerif = useThemeStore((state) => state.isSerif);

  const { query, isSearching, toggleSearch } = useSearchStore(
    (state) => ({
      query: state.query,
      isSearching: state.isSearching,
      toggleSearch: state.toggleSearch,
    }),
    shallow,
  );

  const results = useMemo(() => searchPosts(query, posts), [query, posts]);

  useEffect(() => {
    // toggle search on cmd+k or ctrl+k
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearch();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toggleSearch]);

  if (!isSearching) return null;

  return (
    <section
      className={clsx(
        isSerif && 'font-serif',
        'fixed left-1/2 top-1/2 z-50 flex h-fit max-h-[80vh] w-5/6 max-w-3xl -translate-x-1/2 -translate-y-1/2 flex-col p-4',
        'border-slate-300 bg-slate-200 bg-opacity-0 dark:border-slate-500 dark:bg-slate-600 dark:bg-opacity-70',
        'rounded-md border-2 backdrop-blur-md',
      )}
    >
      <div className="mb-2 flex h-fit flex-row items-center">
        <SearchInput hasResults={results.length > 0} />
        <button onClick={toggleSearch}>
          <ChevronUp
            className="ml-2 h-6 w-6 text-slate-400 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400"
            aria-label="Close Search"
          />
        </button>
      </div>

      <SearchResults query={query} results={results} />

      {results.length > 0 && (
        <hr className="my-2 hidden border-slate-400  dark:border-slate-600 sm:block" />
      )}

      <SearchTags
        posts={posts}
        className={clsx(
          results.length > 0 ? 'max-xs:hidden sm:text-base' : 'sm:text-lg',
          'my-2',
        )}
      />

      <div className="absolute bottom-1 left-2 text-xs text-slate-600 dark:text-slate-200 max-sm:hidden">
        Toggle with ???+K or Ctrl+K
      </div>
    </section>
  );
}
