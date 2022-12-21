import type { Meta, StoryObj } from '@storybook/react';
import { CopyCode } from '@/components/copy-code';
import '@/styles/markdown.css';

const codeElement = (
  <code className="hljs rounded">
    {`
import type { Meta, StoryObj } from '@storybook/react';
import { CopyCode } from './copy-code';
import '@/styles/markdown.css';
    `}
  </code>
);

const meta: Meta<typeof CopyCode> = {
  title: 'Copy Code Button',
  component: CopyCode,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <pre className="relative mx-auto max-w-3xl">
        <Story args={{ codeElement }} />
        {codeElement}
      </pre>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CopyCode>;

export const Normal: Story = {};
