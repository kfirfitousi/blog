'use client';

import { useMemo } from 'react';
import { type Post } from 'contentlayer/generated';

import { useSearchStore } from '@/stores/search-store';
import { getTagsWithCount } from '@/lib/search';
import { cn } from '@/lib/utils';

type SearchTagsProps = {
  posts: Post[];
  className?: string;
};

export function SearchTags({ posts, className }: SearchTagsProps) {
  const tagsWithCounts = useMemo(() => getTagsWithCount(posts), [posts]);
  const setQuery = useSearchStore((state) => state.setQuery);

  return (
    <div
      className={cn(
        'flex h-fit flex-row flex-wrap items-center justify-center space-x-4 space-y-1 text-sm',
        className,
      )}
    >
      {tagsWithCounts.map(([tag, count]) => (
        <button
          key={tag}
          onClick={() => setQuery(tag)}
          className="flex w-fit flex-row items-baseline space-x-0.5"
        >
          <span className="text-slate-600 hover:text-accent dark:text-slate-300 dark:hover:text-accent-dark">
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
