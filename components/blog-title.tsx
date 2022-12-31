'use client';

import { useThemeStore } from '@/stores/theme-store';
import { Waves } from 'lucide-react';
import clsx from 'clsx';

interface BlogTitleProps {
  title: string;
  small?: boolean;
}

export function BlogTitle({ title, small }: BlogTitleProps) {
  const isSerif = useThemeStore((state) => state.isSerif);

  return (
    <div
      className={clsx(
        'inline-flex w-full justify-center',
        small ? 'items-center' : 'items-baseline',
      )}
    >
      <Waves
        className={clsx(
          small ? 'h-4 w-4' : 'h-8 w-8',
          'text-rose-700 text-opacity-40 dark:text-rose-400',
        )}
        aria-hidden
      />
      <h1
        className={clsx(
          isSerif && 'font-serif',
          small
            ? 'mx-0.5 text-lg font-semibold'
            : 'mx-2 pb-1.5 text-5xl font-bold sm:text-6xl',
          'whitespace-nowrap text-center drop-shadow-sm',
          'text-slate-800 hover:text-rose-600 dark:text-rose-50 dark:hover:text-rose-400',
        )}
      >
        {title}
      </h1>
      <Waves
        className={clsx(
          small ? 'h-4 w-4' : 'h-8 w-8',
          'text-rose-700 text-opacity-40 dark:text-rose-400',
        )}
        aria-hidden
      />
    </div>
  );
}
