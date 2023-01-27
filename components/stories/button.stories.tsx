import type { Meta, StoryObj } from '@storybook/react';
import { FileText } from 'lucide-react';

import { Button } from '@/components/button';
import { Center } from './decorators';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  decorators: [Center],
  args: {
    href: '#',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const WithIcon: Story = {
  args: {
    label: 'All Posts',
    icon: <FileText className="h-4 w-4" />,
  },
};

export const WithoutIcon: Story = {
  args: {
    label: 'Click Me',
  },
};
