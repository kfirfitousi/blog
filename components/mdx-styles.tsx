'use client';

import '@/styles/markdown.css';
import { useThemeStore } from '@/stores/theme-store';
import { cn } from '@/lib/utils';

type MDXStylesProps = {
  children: React.ReactNode;
};

export function MDXStyles({ children }: MDXStylesProps) {
  const fontSize = useThemeStore((state) => state.fontSize);

  return (
    <section
      className={cn(
        'prose-' + fontSize,
        'prose prose-slate max-w-none py-8 dark:prose-invert dark:text-rose-50',
        'prose-headings:drop-shadow-sm dark:prose-headings:text-rose-50',
        'prose-ul:my-4 prose-li:my-0 prose-li:marker:text-slate-600 dark:prose-li:marker:text-slate-400',
        'prose-a:text-accent prose-a:no-underline hover:prose-a:underline dark:prose-a:text-accent-dark',
        'prose-blockquote:border-l-slate-800 dark:prose-blockquote:border-l-slate-300 dark:prose-blockquote:text-rose-50',
        'prose-hr:border-slate-700 dark:prose-hr:border-slate-300',
      )}
    >
      {children}
    </section>
  );
}
