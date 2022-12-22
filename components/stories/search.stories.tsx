import type { Meta, StoryObj } from '@storybook/react';
import { useSearchStore } from '@/stores/search-store';
import { Search } from '@/components/search';

const examplePost = (num: number) => ({
  frontmatter: {
    date: '2022-01-01',
    title: `Example Post ${num}`,
    tags: ['example', 'post', 'tags', 'test', 'storybook'],
    excerpt: 'This is an example post.',
  },
  slug: 'example-post',
  url: '/posts/examples/example-post',
  filepath: 'posts/examples/example-post.mdx',
  hash: 'example-post',
  raw: '',
  serialized: '' as any,
});

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
  args: {
    posts: Array.from({ length: 10 }).map((_, i) => examplePost(i + 1)),
  },
};
