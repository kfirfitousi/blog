import type { Meta, StoryObj } from '@storybook/react';
import { PostIntro } from './post-intro';

const meta: Meta<typeof PostIntro> = {
  title: 'Post Intro',
  component: PostIntro,
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-3xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PostIntro>;

export const Normal: Story = {
  args: {
    title: 'Example Post',
    date: '2022-01-01',
    tags: ['example', 'post', 'storybook'],
  },
};
