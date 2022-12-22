import type { Meta, StoryObj } from '@storybook/react';
import { CopyCode } from '@/components/copy-code';
import { Center } from './decorators';
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
  decorators: [
    (Story) => (
      <pre className="relative mx-auto max-w-3xl">
        <Story args={{ codeElement }} />
        {codeElement}
      </pre>
    ),
    Center,
  ],
};

export default meta;
type Story = StoryObj<typeof CopyCode>;

export const Normal: Story = {};
