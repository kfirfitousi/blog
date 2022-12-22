import type { Meta, StoryObj } from '@storybook/react';
import { getDummyPost } from '@/lib/dummy-post';
import { useSearchStore } from '@/stores/search-store';
import { Search } from '@/components/search';

const posts = Array.from({ length: 10 }).map((_, i) =>
  getDummyPost({
    title: `Example Post ${i + 1}`,
    excerpt: 'This is an example post.',
    date: '2022-01-01',
    tags: ['example', 'post', 'test', 'storybook', `tag-${i + 1}`],
  }),
);

const meta: Meta<typeof Search> = {
  title: 'Search',
  component: Search,
  decorators: [
    (Story) => {
      const toggleSearch = useSearchStore((state) => state.toggleSearch);
      toggleSearch();

      return <Story />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof Search>;

export const Normal: Story = {
  args: { posts },
};
