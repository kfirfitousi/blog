import type { Post } from 'contentlayer/generated';
import type { Meta, StoryObj } from '@storybook/react';

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
    post: {
      title: 'Example Post',
      excerpt: 'This is an example post.',
      date: '2022-01-01',
      tags: ['example', 'post', 'tags'],
      url: '/posts/example-post',
      slug: 'posts/example-post',
    } as Post,
  },
};

export const FreshPost: Story = {
  args: {
    post: {
      title: 'Example Post',
      excerpt: 'This is an example post.',
      date: new Date().toISOString(),
      tags: ['example', 'post', 'tags'],
      url: '/posts/example-post',
      slug: 'posts/example-post',
    } as Post,
  },
};
