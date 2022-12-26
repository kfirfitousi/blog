import { type StoryFn } from '@storybook/react';

export const Center = (Story: StoryFn) => (
  <div className="flex h-full items-center justify-center">
    <Story />
  </div>
);
