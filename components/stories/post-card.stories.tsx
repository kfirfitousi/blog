import type { Meta, StoryObj } from '@storybook/react';
import { getDummyPost } from '@/lib/dummy-post';
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
    post: getDummyPost({
      title: 'Example Post',
      excerpt: 'This is an example post.',
      date: '2022-01-01',
      tags: ['example', 'post', 'tags'],
    }),
  },
};

export const FreshPost: Story = {
  args: {
    post: getDummyPost({
      title: 'Example Post',
      excerpt: 'This is an example post.',
      date: new Date().toISOString(),
      tags: ['example', 'post', 'tags'],
    }),
  },
};
