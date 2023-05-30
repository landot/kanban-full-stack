import type { Meta, StoryObj } from '@storybook/react';

import { UpdateTaskModal } from './UpdateTaskModal';

const meta = {
  title: 'UpdateTaskModal',
  component: UpdateTaskModal,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof UpdateTaskModal>;

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
            subtasks: ['description 1', 'description 2'],
            status: 'done'
        }
    },
  };

  