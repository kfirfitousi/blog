import type { Post } from 'contentlayer/generated';
import type { Meta, StoryObj } from '@storybook/react';
import { dummyArray } from 'contentlayer-mock';

import { PostPaginator } from '@/components/post-paginator';
import { Padding } from './decorators';

const posts = dummyArray<Post>(100, (index) => ({
  title: `Post ${index + 1}`,
  excerpt: `This is post ${index + 1}`,
  date: '2022-01-01',
  tags: ['example', 'post', 'tags'],
  url: `/posts/post-${index + 1}`,
  slug: `posts/post-${index + 1}`,
}));

const meta: Meta<typeof PostPaginator> = {
  title: 'Post Paginator',
  component: PostPaginator,
  decorators: [Padding],
  args: {
    postsPerPage: 5,
  },
};

export default meta;
type Story = StoryObj<typeof PostPaginator>;

export const TenPages: Story = {
  args: {
    posts: posts.slice(0, 50),
  },
};

export const ThreePages: Story = {
  args: {
    posts: posts.slice(0, 15),
  },
};

export const TwoPages: Story = {
  args: {
    posts: posts.slice(0, 10),
  },
};

export const OnePage: Story = {
  args: {
    posts: posts.slice(0, 5),
  },
};

export const TwentyPages: Story = {
  args: {
    posts,
  },
};

export const OnePost: Story = {
  args: {
    posts: posts.slice(0, 1),
  },
};

export const TenPerPage: Story = {
  args: {
    posts,
    postsPerPage: 10,
  },
};
