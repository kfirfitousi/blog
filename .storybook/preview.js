import '@/styles/globals.css';
import '@/styles/storybook.css';

import { Red_Hat_Display, Newsreader } from '@next/font/google';

const fontSans = Red_Hat_Display({
  subsets: ['latin'],
  variable: '--font-red-hat',
});

const fontSerif = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
});

export const parameters = {
  nextjs: {
    appDirectory: true,
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <div
      className={[fontSans.variable.replace(' ', '-'), fontSerif.variable].join(' ')}
      style={{
        fontFamily: 'var(--font-red-hat)',
      }}
    >
      <div />
      <Story />
    </div>
  ),
];
