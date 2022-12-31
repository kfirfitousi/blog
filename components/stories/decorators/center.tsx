import { type StoryFn } from '@storybook/react';

export const Center = (Story: StoryFn) => (
  <div className="flex h-full w-full items-center justify-center">
    <Story />
  </div>
);
