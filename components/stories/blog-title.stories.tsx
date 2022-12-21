import type { Meta, StoryObj } from '@storybook/react';
import { BlogTitle } from '@/components/blog-title';

const meta: Meta<typeof BlogTitle> = {
  title: 'Blog Title',
  component: BlogTitle,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof BlogTitle>;

export const Big: Story = {
  args: {
    title: "Kfir's Blog",
    small: false,
  },
};

export const Small: Story = {
  args: {
    title: "Kfir's Blog",
    small: true,
  },
};
