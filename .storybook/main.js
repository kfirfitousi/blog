module.exports = {
  stories: [
    '../app/**/*.stories.@(js|jsx|ts|tsx)',
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-tailwind-dark-mode'
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    docsPage: true,
  },
};
