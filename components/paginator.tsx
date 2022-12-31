'use client';

import { useState } from 'react';
import { type BlogMdxNode } from '@/lib/mdx/sources';
import { useThemeStore } from '@/stores/theme-store';
import { PostCard } from '@/components/post-card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

type PaginatorProps = {
  posts: BlogMdxNode[];
  postsPerPage: number;
};

export function Paginator({ posts, postsPerPage }: PaginatorProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const lastPage = Math.ceil(posts.length / postsPerPage);
  const isSerif = useThemeStore((state) => state.isSerif);

  const Controls = ({ bottom = false }) => (
    <div
      className={clsx(
        isSerif && 'font-serif',
        'grid w-full grid-cols-[6rem,1fr,6rem] items-center justify-between',
      )}
    >
      <button
        onClick={() => {
          setCurrentPage(currentPage - 1);
          if (bottom) {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          }
        }}
        disabled={currentPage === 1}
        className={clsx(
          bottom ? 'place-self-start' : 'place-self-end',
          'flex h-6 flex-row items-center space-x-1 justify-self-start',
          'text-slate-600 enabled:hover:text-rose-600 disabled:text-slate-400',
          'dark:text-slate-300 dark:enabled:hover:text-rose-400 dark:disabled:text-slate-500',
        )}
      >
        <ArrowLeft aria-label="Previous page" />
        <span>Previous</span>
      </button>
      <div className="flex flex-row flex-wrap justify-center space-x-2 px-2 text-2xl">
        {Array.from({ length: currentPage }, (_, i) => (
          <span
            key={i}
            className={clsx(
              currentPage === i + 1
                ? 'leading-3'
                : currentPage === i + 2
                ? 'leading-4'
                : 'leading-5',
              'text-slate-800 dark:text-slate-300',
            )}
          >
            •
          </span>
        ))}
        {Array.from({ length: lastPage - currentPage }, (_, i) => (
          <span
            key={i}
            className={clsx(
              i === 0 ? 'leading-4' : 'leading-5',
              'text-slate-400 dark:text-slate-500',
            )}
          >
            •
          </span>
        ))}
      </div>
      <button
        onClick={() => {
          setCurrentPage(currentPage + 1);
          if (bottom) {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          }
        }}
        disabled={currentPage === lastPage}
        className={clsx(
          bottom ? 'place-self-start' : 'place-self-end',
          'flex h-6 flex-row items-center justify-end space-x-1 justify-self-end',
          'text-slate-600 enabled:hover:text-rose-600 disabled:text-slate-400',
          'dark:text-slate-300 dark:enabled:hover:text-rose-400 dark:disabled:text-slate-500',
        )}
      >
        <span className="h-full">Next</span>
        <ArrowRight aria-label="Next page" />
      </button>
    </div>
  );

  return (
    <section className="flex h-full w-full flex-col space-y-4">
      <Controls />
      <div className="flex h-full w-full flex-col space-y-4">
        {posts
          .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
          .map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
      </div>
      <Controls bottom />
    </section>
  );
}
