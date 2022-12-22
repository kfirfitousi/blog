import type { Meta, StoryObj } from '@storybook/react';
import { PostTags } from '@/components/post-tags';
import { Center } from './decorators';

const meta: Meta<typeof PostTags> = {
  title: 'Post Tags',
  component: PostTags,
  decorators: [Center],
};

export default meta;
type Story = StoryObj<typeof PostTags>;

export const Normal: Story = {
  args: {
    tags: ['example', 'post', 'tags', 'test', 'storybook'],
  },
};
