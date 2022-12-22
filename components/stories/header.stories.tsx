import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '@/components/header';

const meta: Meta<typeof Header> = {
  title: 'Header',
  component: Header,
  decorators: [
    (Story) => (
      <div className="relative min-h-[200vh]">
        <div className="sticky top-0 w-full">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const WithFontControls: Story = {
  parameters: {
    nextjs: {
      navigation: {
        segments: ['posts', 'examples', 'example-post'],
      },
    },
  },
};

export const Normal: Story = {
  parameters: {
    nextjs: {
      navigation: {
        segments: [''],
      },
    },
  },
};
