'use client';

import Balancer from 'react-wrap-balancer';

import { useThemeStore } from '@/stores/theme-store';
import { PostTags } from '@/components/post-tags';
import { formatDateTime } from '@/lib/datetime';
import { cn } from '@/lib/utils';

type PostIntroProps = {
  title: string;
  date: string;
  tags: string[];
};

export function PostIntro({ title, date, tags }: PostIntroProps) {
  const fontSize = useThemeStore((state) => state.fontSize);
  const publishedDate = formatDateTime(date);

  return (
    <section className="flex flex-col space-y-4 sm:p-3">
      <h1
        className={cn(
          'font-bold text-slate-800 drop-shadow-sm dark:text-rose-50',
          fontSize === 'sm' && 'text-xl sm:text-2xl md:text-3xl',
          fontSize === 'base' && 'text-2xl sm:text-3xl md:text-4xl',
          fontSize === 'lg' && 'text-3xl sm:text-4xl md:text-5xl',
          fontSize === 'xl' && 'text-4xl sm:text-5xl md:text-6xl',
          fontSize === '2xl' && 'text-5xl sm:text-6xl md:text-7xl',
        )}
      >
        <Balancer>{title}</Balancer>
      </h1>
      <div
        className={cn(
          'text-slate-700 dark:text-rose-50',
          fontSize === 'sm' && 'text-xs sm:text-sm',
          fontSize === 'base' && 'text-sm sm:text-base',
          fontSize === 'lg' && 'text-base sm:text-lg',
          fontSize === 'xl' && 'text-lg sm:text-xl',
          fontSize === '2xl' && 'text-xl sm:text-2xl',
        )}
      >
        <span>Published </span>
        <time dateTime={publishedDate.asISOString}>
          {publishedDate.asString}{' '}
        </time>
        <div className="inline-block text-slate-600 dark:text-rose-50/60">
          {' '}
          · {publishedDate.asRelativeTimeString}
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
