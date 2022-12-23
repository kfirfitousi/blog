import type { Meta, StoryObj } from '@storybook/react';
import { getDummyPosts } from '@/lib/dummy-post';
import { Paginator } from '@/components/paginator';
import { Padding } from './decorators';

const posts = getDummyPosts(
  (index) => ({
    title: `Post ${index + 1}`,
    excerpt: `This is post ${index + 1}`,
    date: '2022-01-01',
    tags: ['example', 'post', 'tags'],
  }),
  25,
);

const meta: Meta<typeof Paginator> = {
  title: 'Paginator',
  component: Paginator,
  decorators: [Padding],
};

export default meta;
type Story = StoryObj<typeof Paginator>;

export const OnePage: Story = {
  args: {
    posts: posts.slice(0, 5),
    postPerPage: 5,
  },
};

export const FivePages: Story = {
  args: {
    posts,
    postPerPage: 5,
  },
};
