import { type StoryFn } from '@storybook/react';

import { MDXStyles } from '@/components/mdx-styles';

export const Markdown = (Story: StoryFn) => {
  return (
    <MDXStyles>
      <Story />
    </MDXStyles>
  );
};
