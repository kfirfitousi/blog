import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './header';

const meta: Meta<typeof Header> = {
  title: 'Header',
  component: Header,
  tags: ['docsPage'],
  parameters: {
    layout: 'fullscreen',
  },
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
