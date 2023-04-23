import type { Meta, StoryObj } from '@storybook/react';
import { Github } from 'lucide-react';

import { Tooltip } from '@/components/tooltip';
import { Center } from './decorators';

const meta: Meta<typeof Tooltip> = {
  title: 'Tooltip',
  component: Tooltip,
  render: (args) => (
    <>
      <Github
        id="github"
        className="icon-base"
        data-tooltip-content={args.content}
        data-tooltip-id="tooltip"
        aria-label={args.content}
      />
      <Tooltip id="tooltip" {...args} />
    </>
  ),
  decorators: [Center],
  args: {
    content: 'My GitHub profile',
  },
  argTypes: {
    place: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Top: Story = { args: { place: 'top' } };

export const Bottom: Story = { args: { place: 'bottom' } };

export const Left: Story = { args: { place: 'left' } };

export const Right: Story = { args: { place: 'right' } };
