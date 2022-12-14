import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/button';
import { FileText } from 'lucide-react';
import { Center } from './decorators';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  decorators: [Center],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const WithIcon: Story = {
  args: {
    href: '#',
    label: 'All Posts',
    icon: <FileText className="h-4 w-4" />,
  },
};

export const WithoutIcon: Story = {
  args: {
    href: '#',
    label: 'Click Me',
  },
};
