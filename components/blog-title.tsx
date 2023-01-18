'use client';

import { useThemeStore } from '@/stores/theme-store';
import { Waves } from 'lucide-react';
import { cn } from '@/lib/utils';

type BlogTitleProps = {
  title?: string;
  small?: boolean;
};

export function BlogTitle({ title = "Kfir's Blog", small }: BlogTitleProps) {
  const isSerif = useThemeStore((state) => state.isSerif);

  return (
    <div
      className={cn(
        small ? 'items-center' : 'items-baseline',
        'inline-flex w-full justify-center',
      )}
    >
      <Waves
        className={cn(
          small ? 'h-4 w-4' : 'h-8 w-8',
          'text-rose-700 text-opacity-40 dark:text-rose-400',
        )}
        aria-hidden
      />
      <h1
        className={cn(
          isSerif && 'font-serif',
          small
            ? 'mx-0.5 text-lg font-semibold'
            : 'mx-2 pb-1.5 text-5xl font-bold sm:text-6xl',
          'whitespace-nowrap text-center drop-shadow-sm',
          'text-slate-800 hover:text-rose-600',
          'dark:text-rose-50 dark:hover:text-rose-400',
        )}
      >
        {title}
      </h1>
      <Waves
        className={cn(
          small ? 'h-4 w-4' : 'h-8 w-8',
          'text-rose-700 text-opacity-40 dark:text-rose-400',
        )}
        aria-hidden
      />
    </div>
  );
}
