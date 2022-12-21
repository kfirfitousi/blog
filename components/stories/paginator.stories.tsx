import type { Meta, StoryObj } from '@storybook/react';
import { Paginator } from '@/components/paginator';

const examplePost = (num: number) => ({
  frontmatter: {
    date: '2022-01-01',
    title: `Example Post ${num}`,
    tags: ['example', 'post'],
    excerpt: 'This is an example post.',
  },
  slug: 'example-post',
  url: '/posts/examples/example-post',
  filepath: 'posts/examples/example-post.mdx',
  hash: 'example-post',
  raw: '',
  serialized: '' as any,
});

const meta: Meta<typeof Paginator> = {
  title: 'Paginator',
  component: Paginator,
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-3xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Paginator>;

export const OnePage: Story = {
  args: {
    posts: Array.from({ length: 5 }).map((_, i) => examplePost(i + 1)),
    postPerPage: 5,
  },
};

export const FivePages: Story = {
  args: {
    posts: Array.from({ length: 25 }).map((_, i) => examplePost(i + 1)),
    postPerPage: 5,
  },
};
