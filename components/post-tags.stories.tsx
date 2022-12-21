import type { Meta, StoryObj } from '@storybook/react';
import { PostTags } from './post-tags';

const meta: Meta<typeof PostTags> = {
  title: 'Post Tags',
  component: PostTags,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof PostTags>;

export const Normal: Story = {
  args: {
    tags: ['example', 'post', 'tags', 'test', 'storybook'],
  },
};
