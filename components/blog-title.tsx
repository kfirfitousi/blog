'use client';

import { blogConfig } from '@/config';
import { cn } from '@/lib/utils';

type BlogTitleProps = {
  className?: string;
};

export function BlogTitle({ className }: BlogTitleProps) {
  return (
    <div
      className={cn(
        'inline-flex w-full items-center justify-center',
        className,
      )}
    >
      {blogConfig.titleParts && (
        <div className="text-accent dark:text-accent-dark">‹</div>
      )}
      <h1
        className={cn(
          'mx-0.5 whitespace-nowrap text-center font-semibold drop-shadow-sm',
          'text-slate-800 hover:text-accent',
          'dark:text-rose-50 dark:hover:text-accent-dark',
        )}
      >
        {blogConfig.titleParts ? (
          <>
            {blogConfig.titleParts[0]}
            <span className="px-px font-light text-accent dark:text-accent-dark">
              /
            </span>
            {blogConfig.titleParts[1]}
          </>
        ) : (
          blogConfig.title
        )}
      </h1>
      {blogConfig.titleParts && (
        <div className="text-accent dark:text-accent-dark">›</div>
      )}
    </div>
  );
}
