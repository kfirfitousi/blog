import type { Meta, StoryObj } from '@storybook/react';
import { PostCard } from '@/components/post-card';
import { Center } from './decorators';

const meta: Meta<typeof PostCard> = {
  title: 'Post Card',
  component: PostCard,
  decorators: [
    (Story) => (
      <div className="flex w-full px-6 sm:px-12">
        <Story />
      </div>
    ),
    Center,
  ],
};

export default meta;
type Story = StoryObj<typeof PostCard>;

export const Normal: Story = {
  args: {
    post: {
      frontmatter: {
        title: 'Example Post',
        date: '2022-01-01',
        tags: ['example', 'post'],
        excerpt: 'This is an example post.',
      },
      slug: 'example-post',
      url: '/posts/examples/example-post',
      filepath: 'posts/examples/example-post.mdx',
      hash: 'example-post',
      raw: '',
      serialized: '' as any,
    },
  },
};

export const FreshPost: Story = {
  args: {
    post: {
      frontmatter: {
        title: 'Example Post',
        date: new Date().toISOString(),
        tags: ['example', 'post'],
        excerpt: 'This is an example post.',
      },
      slug: 'example-post',
      url: '/posts/examples/example-post',
      filepath: 'posts/examples/example-post.mdx',
      hash: 'example-post',
      raw: '',
      serialized: '' as any,
    },
  },
};
