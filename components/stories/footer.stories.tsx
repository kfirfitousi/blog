import type { Meta, StoryObj } from '@storybook/react';

import { Footer } from '@/components/footer';

const meta: Meta<typeof Footer> = {
  title: 'Footer',
  component: Footer,
  decorators: [
    (Story) => (
      <div className="flex h-screen flex-col">
        <div className="mt-auto h-32">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Normal: Story = {};
