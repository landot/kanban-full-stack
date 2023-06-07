import type { Meta, StoryObj } from '@storybook/react';
import { sampleBoard } from '../data/sampleData';

import { UpdateTaskModal } from './UpdateTaskModal';

// todo fix these stories
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
        updateType: 'add',
        board: sampleBoard,
        prefill: sampleBoard.columns[0].tasks[0],
        statuses: sampleBoard.columns.map(column => column.name)
    },
};

export const Edit: Story = {
    args: {
        updateType: 'edit',
        board: sampleBoard,
        prefill: sampleBoard.columns[0].tasks[0],
        statuses: sampleBoard.columns.map(column => column.name)
    },
  };

  