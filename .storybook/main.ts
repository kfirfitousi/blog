import { type StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../components/stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-tailwind-dark-mode',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
};

export default config;
