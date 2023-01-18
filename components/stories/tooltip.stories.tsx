import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '@/components/tooltip';
import { Github } from 'lucide-react';
import { Center } from './decorators';
import { cn } from '@/lib/utils';

const meta: Meta<typeof Tooltip> = {
  title: 'Tooltip',
  component: Tooltip,
  decorators: [
    (Story, ctx) => (
      <>
        <Github
          id="github"
          className={cn(
            'h-6 w-6 hover:scale-110 hover:pb-0.5',
            'text-slate-700 hover:text-rose-600',
            'dark:text-rose-50 dark:hover:text-rose-400',
          )}
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
