'use client';

import { useState } from 'react';
import { type BlogMdxNode } from '@/lib/mdx-sources';
import { useThemeStore } from '@/stores/theme-store';
import { PostCard } from '@/components/post-card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

type PaginatorProps = {
  posts: BlogMdxNode[];
  postPerPage: number;
};

export function Paginator({ posts, postPerPage }: PaginatorProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const isSerif = useThemeStore((state) => state.isSerif);

  const controls = (withScroll = false) => (
    <div
      className={clsx(
        isSerif && 'font-serif',
        'flex flex-row items-center justify-between',
      )}
    >
      <button
        onClick={() => {
          setCurrentPage(currentPage - 1);
          if (withScroll) {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          }
        }}
        disabled={currentPage === 1}
        className="flex flex-row space-x-1 text-slate-600 enabled:hover:text-rose-600 disabled:text-slate-400 dark:text-slate-300 dark:enabled:hover:text-rose-400 dark:disabled:text-slate-500"
      >
        <ArrowLeft />
        <span>Previous</span>
      </button>
      <div className="flex -translate-x-1/2 scale-150 flex-row space-x-2">
        {Array.from('•'.repeat(currentPage)).map((_, i) => (
          <span key={i} className="text-slate-800 dark:text-slate-300">
            •
          </span>
        ))}
        {Array.from(
          '•'.repeat(Math.ceil(posts.length / postPerPage) - currentPage),
        ).map((_, i) => (
          <span key={i} className="text-slate-400 dark:text-slate-500">
            •
          </span>
        ))}
      </div>
      <button
        onClick={() => {
          setCurrentPage(currentPage + 1);
          if (withScroll) {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          }
        }}
        disabled={currentPage === Math.ceil(posts.length / postPerPage)}
        className="flex flex-row space-x-1 text-slate-600 enabled:hover:text-rose-600 disabled:text-slate-400 dark:text-slate-300 dark:enabled:hover:text-rose-400 dark:disabled:text-slate-500"
      >
        <span>Next</span>
        <ArrowRight />
      </button>
    </div>
  );

  return (
    <section className="flex w-full flex-col space-y-4">
      {controls()}
      {posts
        .slice((currentPage - 1) * postPerPage, currentPage * postPerPage)
        .map((post) => (
          <PostCard key={post?.slug} post={post} />
        ))}
      {controls(true)}
    </section>
  );
}
