import type { Meta, StoryObj } from '@storybook/react';
import { CodeBlock } from '@/components/code-block';
import { Center, Padding } from './decorators';
import '@/styles/markdown.css';

const codeElement = (
  <code className="hljs rounded">
    {`import { BlogSource } from "@/lib/mdx/sources";
import { Paginator } from "@/components/paginator";

export default async function PostsPage() {
  const posts = await BlogSource.getAllMdxNodes();

  return (
    <div className="h-full px-6 pb-12 sm:px-12">
      <Paginator posts={posts} postsPerPage={5} />
    </div>
  );
}`}
  </code>
);

const meta: Meta<typeof CodeBlock> = {
  title: 'Code Block',
  component: CodeBlock,
  args: {
    children: codeElement,
  },
  decorators: [
    (Story) => (
      <div className="w-full">
        <Story />
      </div>
    ),
    Center,
    Padding,
  ],
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

export const Normal: Story = {};

export const WithTitle: Story = {
  decorators: [
    (Story) => (
      <>
        <div className="rehype-code-title">page.tsx</div>
        <Story />
      </>
    ),
  ],
};
