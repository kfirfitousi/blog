'use client';

import { type Post } from 'contentlayer/generated';
import { useThemeStore } from '@/stores/theme-store';
import { formatDateTime } from '@/lib/datetime';
import { PostTags } from '@/components/post-tags';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  const isSerif = useThemeStore((state) => state.isSerif);
  const dateTime = formatDateTime(post.date);

  return (
    <Link
      href={post.url}
      className={cn(
        'group relative flex h-fit w-full',
        'transition-transform duration-300 ease-in-out hover:scale-[1.02]',
      )}
      aria-label={post.title}
    >
      <article
        className={cn(
          isSerif && 'font-serif',
          'flex h-fit w-full flex-col space-y-4 rounded',
          'relative z-10 m-[2px] py-3 pl-10 pr-8 shadow-lg hover:shadow-xl',
          'bg-slate-100 bg-opacity-95',
          'dark:bg-slate-600 dark:bg-opacity-90',
        )}
      >
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-bold leading-normal text-slate-800 dark:text-rose-50 sm:text-3xl">
            {post.title}
            {dateTime.isFresh && (
              <>
                {' '}
                <sup className="text-base text-rose-600 text-opacity-40 dark:text-rose-200">
                  New
                </sup>
              </>
            )}
          </h2>

          <p className="text-slate-700 dark:text-rose-50">{post.excerpt}</p>

          <p
            className={cn(
              'inline-flex items-center space-x-1',
              'text-slate-600 opacity-90',
              'dark:text-rose-50 dark:opacity-70',
            )}
          >
            <Calendar className="h-4 w-4 self-baseline" aria-hidden />
            <span className="text-sm">
              Published {dateTime.asString}{' '}
              <span className="hidden opacity-90 dark:opacity-80 xs:inline">
                · {dateTime.asRelativeTimeString}
              </span>
            </span>
          </p>
        </div>
        <PostTags tags={post.tags} className="text-sm sm:text-xs" />
      </article>
      <div
        className={cn(
          'absolute inset-0 z-20 my-auto h-[calc(100%_-_4px)] w-4 rounded-l',
          'group-hover:animate-border group-focus:animate-border-fast',
          'bg-slate-700 dark:bg-rose-50',
        )}
      />
    </Link>
  );
}
