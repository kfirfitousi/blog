'use client';

import { useThemeStore } from '@/stores/theme-store';
import { parseDate } from '@/lib/datetime';
import { PostTags } from '@/components/post-tags';
import clsx from 'clsx';

interface PostIntroProps {
  title: string;
  date: string;
  tags: string[];
}

export function PostIntro({ title, date, tags }: PostIntroProps) {
  const fontSize = useThemeStore((state) => state.fontSize);
  const isSerif = useThemeStore((state) => state.isSerif);

  const { formattedDate, relativeTime } = parseDate(date);

  return (
    <section className="flex flex-col space-y-4 sm:p-3">
      <h1
        className={clsx(
          isSerif && 'font-serif',
          fontSize === 'sm' && 'text-xl sm:text-2xl md:text-3xl',
          fontSize === 'base' && 'text-2xl sm:text-3xl md:text-4xl',
          fontSize === 'lg' && 'text-3xl sm:text-4xl md:text-5xl',
          fontSize === 'xl' && 'text-4xl sm:text-5xl md:text-6xl',
          fontSize === '2xl' && 'text-5xl sm:text-6xl',
          'font-bold text-slate-800 drop-shadow-sm dark:text-rose-50',
        )}
      >
        {title}
      </h1>
      <p
        className={clsx(
          isSerif && 'font-serif',
          fontSize === 'sm' && 'text-xs sm:text-sm',
          fontSize === 'base' && 'text-sm sm:text-base',
          fontSize === 'lg' && 'text-base sm:text-lg',
          fontSize === 'xl' && 'text-lg sm:text-xl',
          fontSize === '2xl' && 'text-xl sm:text-2xl',
          'text-slate-600 dark:text-slate-200',
        )}
      >
        Published {formattedDate}
        <span className="text-slate-500"> • {relativeTime}</span>
      </p>
      <PostTags
        tags={tags}
        className={clsx(
          isSerif && 'font-serif',
          fontSize === 'sm' && 'text-xs',
          fontSize === 'base' && 'text-sm',
          fontSize === 'lg' && 'text-sm',
          fontSize === 'xl' && 'text-base',
          fontSize === '2xl' && 'text-base',
        )}
      />
    </section>
  );
}
