import type { Meta, StoryObj } from '@storybook/react';
import { getDummyNodes } from '@/lib/mdx/mocks';
import { Paginator } from '@/components/paginator';
import { Padding } from './decorators';

const posts = getDummyNodes(100, (index) => ({
  title: `Post ${index + 1}`,
  excerpt: `This is post ${index + 1}`,
  date: '2022-01-01',
  tags: ['example', 'post', 'tags'],
}));

const meta: Meta<typeof Paginator> = {
  title: 'Paginator',
  component: Paginator,
  decorators: [Padding],
  args: {
    postsPerPage: 5,
  },
};

export default meta;
type Story = StoryObj<typeof Paginator>;

export const OnePage: Story = {
  args: {
    posts: posts.slice(0, 5),
  },
};

export const TwoPages: Story = {
  args: {
    posts: posts.slice(0, 10),
  },
};

export const ThreePages: Story = {
  args: {
    posts: posts.slice(0, 15),
  },
};

export const TenPages: Story = {
  args: {
    posts: posts.slice(0, 50),
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
