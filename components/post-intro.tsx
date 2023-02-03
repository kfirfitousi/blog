'use client';

import { type Post } from 'contentlayer/generated';
import Balancer from 'react-wrap-balancer';

import { useThemeStore } from '@/stores/theme-store';
import { PostTags } from '@/components/post-tags';
import { formatDateTime } from '@/lib/datetime';
import { cn } from '@/lib/utils';

type PostIntroProps = Pick<Post, 'title' | 'date' | 'tags'>;

export function PostIntro({ title, date, tags }: PostIntroProps) {
  const fontSize = useThemeStore((state) => state.fontSize);
  const dateTime = formatDateTime(date);

  return (
    <section className="flex flex-col space-y-4 sm:p-3">
      <h1
        className={cn(
          fontSize === 'sm' && 'text-xl sm:text-2xl md:text-3xl',
          fontSize === 'base' && 'text-2xl sm:text-3xl md:text-4xl',
          fontSize === 'lg' && 'text-3xl sm:text-4xl md:text-5xl',
          fontSize === 'xl' && 'text-4xl sm:text-5xl md:text-6xl',
          fontSize === '2xl' && 'text-5xl sm:text-6xl md:text-7xl',
          'font-bold text-slate-800 drop-shadow-sm dark:text-rose-50',
        )}
      >
        <Balancer>{title}</Balancer>
      </h1>
      <div
        className={cn(
          fontSize === 'sm' && 'text-xs sm:text-sm',
          fontSize === 'base' && 'text-sm sm:text-base',
          fontSize === 'lg' && 'text-base sm:text-lg',
          fontSize === 'xl' && 'text-lg sm:text-xl',
          fontSize === '2xl' && 'text-xl sm:text-2xl',
          'text-slate-700 dark:text-rose-50',
        )}
      >
        <span>Published </span>
        <time dateTime={dateTime.asISOString}>{dateTime.asString} </time>
        <div className="inline-block text-slate-600 dark:text-rose-50/60">
          {' '}
          · {dateTime.asRelativeTimeString}
        </div>
      </div>
      <PostTags
        tags={tags}
        className={cn(
          fontSize === 'sm' && 'text-xs',
          fontSize === 'base' && 'text-xs',
          fontSize === 'lg' && 'text-sm',
          fontSize === 'xl' && 'text-base',
          fontSize === '2xl' && 'text-lg',
        )}
      />
    </section>
  );
}
