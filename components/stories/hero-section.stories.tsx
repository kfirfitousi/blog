import type { Meta, StoryObj } from '@storybook/react';

import { HeroSection } from '@/components/hero-section';
import { Padding } from './decorators';

const meta: Meta<typeof HeroSection> = {
  title: 'Hero Section',
  component: HeroSection,
  decorators: [Padding],
};

export default meta;
type Story = StoryObj<typeof HeroSection>;

export const Normal: Story = {};
