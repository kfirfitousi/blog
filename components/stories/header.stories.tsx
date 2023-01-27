import type { Meta, StoryObj } from '@storybook/react';

import { Header } from '@/components/header';

const meta: Meta<typeof Header> = {
  title: 'Header',
  component: Header,
  decorators: [
    (Story) => (
      <div className="relative min-h-[200vh]">
        <div className="sticky top-0 h-24 w-full">
          <Story />
        </div>
        <div className="flex h-[calc(100vh-6rem)] flex-col items-center justify-center text-3xl text-slate-300 dark:text-slate-600">
          ↓&nbsp;&nbsp;Scroll Down&nbsp;&nbsp;↓
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const PostPage: Story = {
  parameters: {
    nextjs: {
      navigation: {
        segments: ['posts', 'examples', 'example-post'],
      },
    },
  },
};

export const Normal: Story = {
  parameters: {
    nextjs: {
      navigation: {
        segments: [''],
      },
    },
  },
};
