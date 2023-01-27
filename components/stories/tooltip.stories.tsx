import type { Meta, StoryObj } from '@storybook/react';
import { Github } from 'lucide-react';

import { Tooltip } from '@/components/tooltip';
import { Center } from './decorators';

const meta: Meta<typeof Tooltip> = {
  title: 'Tooltip',
  component: Tooltip,
  decorators: [
    (Story, ctx) => (
      <>
        <Github
          id="github"
          className="icon-base"
          data-tooltip-content={ctx.args.content}
          aria-label={ctx.args.content}
        />
        <Story />
      </>
    ),
    Center,
  ],
  argTypes: {
    anchorId: {
      control: false,
      defaultValue: 'github',
    },
    content: {
      control: 'text',
      defaultValue: 'My GitHub profile',
    },
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
