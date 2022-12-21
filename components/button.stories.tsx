import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import { FileText } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Normal: Story = {
  args: {
    href: '#',
    label: 'All Posts',
    icon: <FileText className="h-4 w-4" />,
  },
};
