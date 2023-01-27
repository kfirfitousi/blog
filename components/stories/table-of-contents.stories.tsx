import type { Meta, StoryObj } from '@storybook/react';

import { TableOfContents } from '@/components/table-of-contents';
import { Markdown, Padding } from './decorators';

const meta: Meta<typeof TableOfContents> = {
  title: 'Table of Contents',
  component: TableOfContents,
  decorators: [Markdown, Padding],
  args: {
    children: (
      <ul>
        <li>
          <a href="#heading-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit
          </a>
        </li>
        <li>
          <a href="#heading-2">
            Quos ex voluptates debitis accusamus laborum fugit aut
          </a>
        </li>
        <li>
          <a href="#heading-3">Quo suscipit aspernatur dicta beatae?</a>
        </li>
        <li>
          <a href="#heading-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit
          </a>
        </li>
      </ul>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof TableOfContents>;

export const Normal: Story = {};
