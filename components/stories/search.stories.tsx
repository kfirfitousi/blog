import type { Post } from 'contentlayer/generated';
import type { Meta, StoryObj } from '@storybook/react';

import { useSearchStore } from '@/stores/search-store';
import { Search } from '@/components/search';

const posts = Array.from({ length: 50 }, (_, index) => ({
  title: `Example Post ${index + 1}`,
  excerpt: 'This is an example post.',
  date: '2022-01-01',
  tags: ['example', 'post', 'test', 'storybook', `tag${(index + 1) % 10}`],
  url: `/posts/post-${index + 1}`,
  slug: `posts/post-${index + 1}`,
  body: {
    raw: `Post ${index + 1} body`,
  },
})) as Post[];

const meta: Meta<typeof Search> = {
  title: 'Search',
  component: Search,
  decorators: [
    (Story) => {
      useSearchStore((state) => state.toggleSearch)();
      return <Story />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof Search>;

export const Normal: Story = {
  args: { posts },
};
