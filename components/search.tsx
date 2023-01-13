'use client';

import { type Post } from 'contentlayer/generated';
import { useEffect, useMemo } from 'react';
import { useSearchStore } from '@/stores/search-store';
import { useThemeStore } from '@/stores/theme-store';
import { searchPosts } from '@/lib/search';
import { SearchInput } from '@/components/search-input';
import { SearchResults } from '@/components/search-results';
import { SearchTags } from '@/components/search-tags';
import { ChevronUp } from 'lucide-react';
import { shallow } from 'zustand/shallow';
import { cn } from '@/lib/utils';

type SearchProps = {
  posts: Post[];
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
      className={cn(
        isSerif && 'font-serif',
        'fixed left-1/2 top-1/2 z-50 h-fit max-h-[80vh] w-5/6 max-w-3xl -translate-x-1/2 -translate-y-1/2',
        'flex flex-col rounded-md border-2 p-4 backdrop-blur-md',
        'border-slate-300 bg-slate-200 bg-opacity-0',
        'dark:border-slate-500 dark:bg-slate-600 dark:bg-opacity-70',
      )}
    >
      <div className="mb-2 flex h-fit flex-row items-center">
        <SearchInput hasResults={results.length > 0} />
        <button onClick={toggleSearch}>
          <ChevronUp
            className={cn('icon-base ml-2 text-slate-400 dark:text-slate-400')}
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
        className={cn(
          'my-2',
          results.length > 0 ? 'max-xs:hidden sm:text-base' : 'sm:text-lg',
        )}
      />

      <div
        className={cn(
          'absolute bottom-1 left-2 text-xs max-sm:hidden',
          'text-slate-600 dark:text-slate-200',
        )}
      >
        Toggle with ⌘+K or Ctrl+K
      </div>
    </section>
  );
}
