import type { Meta, StoryObj } from '@storybook/react';
import { getDummyNodes } from '@/lib/mdx/mocks';
import { useSearchStore } from '@/stores/search-store';
import { Search } from '@/components/search';

const posts = getDummyNodes(50, (index) => ({
  title: `Example Post ${index + 1}`,
  excerpt: 'This is an example post.',
  date: '2022-01-01',
  tags: ['example', 'post', 'test', 'storybook', `tag${(index + 1) % 10}`],
}));

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
