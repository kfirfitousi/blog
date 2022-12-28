import { type StoryFn } from '@storybook/react';

export const Padding = (Story: StoryFn) => (
  <div className="h-full p-6 sm:p-12">
    <Story />
  </div>
);
