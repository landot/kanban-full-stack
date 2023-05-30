import type { Meta, StoryObj } from '@storybook/react';

import { UpdateTask } from './UpdateTask';

const meta = {
  title: 'UpdateTask',
  component: UpdateTask,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof UpdateTask>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Add: Story = {
    args: {
        updateType: 'add'
    },
};

export const Edit: Story = {
    args: {
        updateType: 'edit',
        prefill: {
            title: 'prefilled title',
            description: 'prefilled description',
            subtasks: ['description 1', 'description 2']
        }
    },
  };

  