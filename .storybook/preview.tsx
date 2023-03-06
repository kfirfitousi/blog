import '@/styles/globals.css';
import 'react-tooltip/dist/react-tooltip.css';
import { Red_Hat_Display } from '@next/font/google';
import type { Decorator, Parameters } from '@storybook/react';
import type { GlobalTypes } from '@storybook/types';

import { cn } from '@/lib/utils';

const fontSans = Red_Hat_Display({
  subsets: ['latin'],
  variable: '--font-red-hat',
});

export const parameters: Parameters = {
  nextjs: { appDirectory: true },
  layout: 'fullscreen',
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const globalTypes: GlobalTypes = {
  darkMode: {
    type: 'boolean',
    defaultValue: false,
  },
};

export const decorators: Decorator[] = [
  (Story) => (
    <div
      className="font-sans"
      style={
        { '--font-red-hat': fontSans.style.fontFamily } as React.CSSProperties
      }
    >
      <div className="grid min-h-screen grid-cols-1 grid-rows-1 bg-slate-200 dark:bg-slate-700 sm:grid-cols-layout">
        <div className="col-span-1 min-h-screen bg-slate-200 dark:bg-slate-700 sm:col-start-2">
          <Story />
        </div>
        <div // left column
          className={cn(
            'col-span-1 col-start-1 row-span-3 row-start-1 hidden bg-gradient-to-r sm:block',
            'from-slate-300 via-slate-400 to-slate-500',
            'dark:from-slate-800 dark:via-slate-700 dark:to-slate-600',
          )}
        >
          <div className="invisible h-full w-full bg-gradient-to-l from-rose-50 to-slate-700 opacity-25 dark:visible" />
        </div>
        <div // right column
          className={cn(
            'col-span-1 col-start-3 row-span-3 row-start-1 hidden bg-gradient-to-l sm:block',
            'from-slate-300 via-slate-400 to-slate-500',
            'dark:from-slate-800 dark:via-slate-700 dark:to-slate-600',
          )}
        >
          <div className="invisible h-full w-full bg-gradient-to-r from-rose-50 to-slate-700 opacity-25 dark:visible" />
        </div>
      </div>
    </div>
  ),
];
