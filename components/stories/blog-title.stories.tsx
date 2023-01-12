import type { Meta, StoryObj } from '@storybook/react';
import { BlogTitle } from '@/components/blog-title';
import { Center } from './decorators';

const meta: Meta<typeof BlogTitle> = {
  title: 'Blog Title',
  component: BlogTitle,
  decorators: [Center],
  args: {
    title: "Kfir's Blog",
  },
};

export default meta;
type Story = StoryObj<typeof BlogTitle>;

export const Big: Story = {
  args: {
    small: false,
  },
};

export const Small: Story = {
  args: {
    small: true,
  },
};
