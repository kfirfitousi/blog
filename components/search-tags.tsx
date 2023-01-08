'use client';

import { type BlogMdxNode } from '@/lib/mdx/sources';
import { getTagsWithCount } from '@/lib/search';
import { useSearchStore } from '@/stores/search-store';
import { useMemo } from 'react';
import clsx from 'clsx';

type SearchTagsProps = {
  posts: BlogMdxNode[];
  className?: string;
};

export function SearchTags({ posts, className }: SearchTagsProps) {
  const tagsWithCounts = useMemo(() => getTagsWithCount(posts), [posts]);
  const setQuery = useSearchStore((state) => state.setQuery);

  return (
    <div
      className={clsx(
        className,
        'flex h-fit flex-row flex-wrap items-center justify-center space-x-4 space-y-1 text-sm',
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
  );
}
