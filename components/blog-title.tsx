'use client';

import { useThemeStore } from '@/stores/theme-store';
import { cn } from '@/lib/utils';

type BlogTitleProps = {
  className?: string;
};

export function BlogTitle({ className }: BlogTitleProps) {
  const isSerif = useThemeStore((state) => state.isSerif);

  return (
    <div
      className={cn(
        'inline-flex w-full items-center justify-center',
        className,
      )}
    >
      <div className="text-rose-600 dark:text-rose-400">‹</div>
      <h1
        className={cn(
          isSerif && 'font-serif',
          'mx-0.5 font-semibold whitespace-nowrap text-center drop-shadow-sm',
          'text-slate-800 hover:text-rose-600',
          'dark:text-rose-50 dark:hover:text-rose-400',
        )}
      >
        kfir
        <span className="px-px font-light text-rose-600 dark:text-rose-400">
          /
        </span>
        blog
      </h1>
      <div className="text-rose-600 dark:text-rose-400">›</div>
    </div>
  );
}
