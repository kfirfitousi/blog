import type { Meta, StoryObj } from '@storybook/react';
import { CopyCode } from '@/components/copy-code';
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

const meta: Meta<typeof CopyCode> = {
  title: 'Copy Code Button',
  component: CopyCode,
  decorators: [
    (Story) => (
      <pre className="relative w-full">
        <Story args={{ codeElement }} />
        {codeElement}
      </pre>
    ),
    Center,
    Padding,
  ],
};

export default meta;
type Story = StoryObj<typeof CopyCode>;

export const Normal: Story = {};
