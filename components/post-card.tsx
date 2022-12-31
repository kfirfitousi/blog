'use client';

import { type BlogMdxNode } from '@/lib/mdx/sources';
import { useThemeStore } from '@/stores/theme-store';
import { formatDateTime } from '@/lib/datetime';
import { PostTags } from '@/components/post-tags';
import { Calendar } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

interface PostCardProps {
  post: BlogMdxNode;
}

export function PostCard({ post }: PostCardProps) {
  const isSerif = useThemeStore((state) => state.isSerif);
  const dateTime = formatDateTime(post.frontmatter.date);

  return (
    <Link
      href={post.url}
      className="group relative flex h-fit w-full transition-transform duration-300 ease-in-out hover:scale-[1.02]"
      aria-label={post.frontmatter.title}
    >
      <article
        className={clsx(
          isSerif && 'font-serif',
          'relative z-10 m-[2px] flex h-fit w-full flex-col space-y-4 rounded py-3 pl-10 pr-8',
          'bg-slate-100 bg-opacity-95 shadow-xl hover:shadow-2xl dark:bg-slate-600 dark:bg-opacity-90',
        )}
      >
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-bold leading-normal text-slate-800 dark:text-rose-50 sm:text-3xl">
            {post.frontmatter.title}
            {dateTime.isFresh && (
              <>
                {' '}
                <sup className="text-base text-rose-600 text-opacity-40 dark:text-rose-200">
                  New
                </sup>
              </>
            )}
          </h2>

          <p className="text-slate-700 dark:text-rose-50">
            {post.frontmatter.excerpt}
          </p>

          <p className="inline-flex items-center space-x-1 text-slate-600 opacity-90 dark:text-rose-50 dark:opacity-70">
            <Calendar className="h-4 w-4 self-baseline" aria-hidden />
            <span className="text-sm">
              Published {dateTime.asString}{' '}
              <span className="hidden opacity-90 dark:opacity-80 xs:inline">
                · {dateTime.asRelativeTimeString}
              </span>
            </span>
          </p>
        </div>
        <PostTags tags={post.frontmatter.tags} className="text-sm sm:text-xs" />
      </article>
      <div
        className="absolute inset-0 z-20 my-auto h-[calc(100%_-_4px)] w-4 rounded-l bg-slate-700
        group-hover:animate-border group-focus:animate-border-fast dark:bg-rose-50"
      />
    </Link>
  );
}
