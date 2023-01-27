import type { Meta, StoryObj } from '@storybook/react';

import { Callout } from '@/components/callout';
import { Markdown, Padding } from './decorators';

const meta: Meta<typeof Callout> = {
  title: 'Callout',
  component: Callout,
  decorators: [Markdown, Padding],
};

export default meta;
type Story = StoryObj<typeof Callout>;

export const Update: Story = {
  args: {
    type: 'update',
    children: (
      <div className="my-4">
        This is an update callout. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Reiciendis quas quasi adipisci ex laudantium neque
        officiis veritatis eligendi tempore modi dignissimos sed, saepe facilis
        totam, natus odit, incidunt perferendis accusamus.
      </div>
    ),
  },
};

export const Note: Story = {
  args: {
    type: 'note',
    children: (
      <div className="my-4">
        This is a note callout. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Reiciendis quas quasi adipisci ex laudantium neque
        officiis veritatis eligendi tempore modi dignissimos sed, saepe facilis
        totam, natus odit, incidunt perferendis accusamus.
      </div>
    ),
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    children: (
      <div className="my-4">
        This is a warning callout. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Reiciendis quas quasi adipisci ex laudantium neque
        officiis veritatis eligendi tempore modi dignissimos sed, saepe facilis
        totam, natus odit, incidunt perferendis accusamus.
      </div>
    ),
  },
};

export const Important: Story = {
  args: {
    type: 'important',
    children: (
      <div className="my-4">
        This is an important callout. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Reiciendis quas quasi adipisci ex laudantium neque
        officiis veritatis eligendi tempore modi dignissimos sed, saepe facilis
        totam, natus odit, incidunt perferendis accusamus.
      </div>
    ),
  },
};
