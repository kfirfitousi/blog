import type { Meta, StoryObj } from '@storybook/react';
import { HeroSection } from './hero-section';

const meta: Meta<typeof HeroSection> = {
  title: 'Hero Section',
  component: HeroSection,
};

export default meta;
type Story = StoryObj<typeof HeroSection>;

export const Normal: Story = {};
