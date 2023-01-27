import type { Meta, StoryObj } from '@storybook/react';

import { PostIntro } from '@/components/post-intro';
import { Padding } from './decorators';

const meta: Meta<typeof PostIntro> = {
  title: 'Post Intro',
  component: PostIntro,
  decorators: [Padding],
};

export default meta;
type Story = StoryObj<typeof PostIntro>;

export const Normal: Story = {
  args: {
    title: 'Example Post',
    date: '2022-01-01',
    tags: ['example', 'post', 'storybook'],
  },
};
