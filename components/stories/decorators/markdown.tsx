import '@/styles/markdown.css';
import { type StoryFn } from '@storybook/react';
import { useThemeStore } from '@/stores/theme-store';
import { cn } from '@/lib/utils';

export const Markdown = (Story: StoryFn) => {
  const isSerif = useThemeStore((state) => state.isSerif);

  return (
    <div
      className={cn(
        isSerif && 'font-serif',
        'prose prose-lg prose-slate max-w-none py-8 dark:prose-invert dark:text-rose-50',
        'prose-headings:drop-shadow-sm dark:prose-headings:text-rose-50',
        'prose-ul:my-1 prose-li:my-0 prose-li:marker:text-slate-600 dark:prose-li:marker:text-slate-400',
        'prose-code:m-0 prose-code:inline-block prose-code:rounded prose-code:px-2 prose-code:font-mono',
        'prose-code:before:content-none prose-code:after:content-none',
        'prose-code:bg-slate-700 prose-code:text-slate-200 dark:prose-code:bg-rose-50 dark:prose-code:text-slate-700',
        'prose-a:text-rose-700 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-rose-300',
        'prose-blockquote:border-l-slate-800 dark:prose-blockquote:border-l-slate-300 dark:prose-blockquote:text-rose-50',
        'prose-hr:border-slate-700 dark:prose-hr:border-slate-300',
      )}
    >
      <Story />
    </div>
  );
};
