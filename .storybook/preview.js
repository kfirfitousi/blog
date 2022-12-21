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

export const globalTypes = {
  darkMode: true,
};

export const decorators = [
  (Story) => (
    <div
      className={[fontSans.variable, fontSerif.variable, 'font-sans'].join(' ')}
      style={{
        // temporary fix for Red Hat Display font not loading
        // TODO: remove when it's fixed
        '--font-red-hat': fontSans.style.fontFamily,
      }}
    >
      <Story />
    </div>
  ),
];
