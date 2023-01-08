import type { Meta, StoryObj } from '@storybook/react';
import { getDummyNode } from '@/lib/mdx/mocks';
import { PostCard } from '@/components/post-card';
import { Center, Padding } from './decorators';

const meta: Meta<typeof PostCard> = {
  title: 'Post Card',
  component: PostCard,
  decorators: [Center, Padding],
};

export default meta;
type Story = StoryObj<typeof PostCard>;

export const Normal: Story = {
  args: {
    post: getDummyNode({
      title: 'Example Post',
      excerpt: 'This is an example post.',
      date: '2022-01-01',
      tags: ['example', 'post', 'tags'],
    }),
  },
};

export const FreshPost: Story = {
  args: {
    post: getDummyNode({
      title: 'Example Post',
      excerpt: 'This is an example post.',
      date: new Date().toISOString(),
      tags: ['example', 'post', 'tags'],
    }),
  },
};
