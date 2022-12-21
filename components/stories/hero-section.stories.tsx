import type { Meta, StoryObj } from '@storybook/react';
import { HeroSection } from '@/components/hero-section';

const meta: Meta<typeof HeroSection> = {
  title: 'Hero Section',
  component: HeroSection,
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-3xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof HeroSection>;

export const Normal: Story = {};
