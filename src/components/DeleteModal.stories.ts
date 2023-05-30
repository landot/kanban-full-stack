import type { Meta, StoryObj } from '@storybook/react';
import { DeleteModal } from './DeleteModal';

const meta = {
  title: 'DeleteModal',
  component: DeleteModal,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof DeleteModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DeleteTask: Story = {
  args: {
    name: 'task',
    text: 'Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This action cannot be reversed.'
  },
};

export const DeleteBoard: Story = {
    args: {
      name: 'task',
      text: 'Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed.'
    },
  };
