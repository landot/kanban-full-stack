import type { Meta, StoryObj } from '@storybook/react';

import { Subtask, ViewTaskModal } from './ViewTaskModal';

const meta = {
  title: 'ViewTaskModal',
  component: ViewTaskModal,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ViewTaskModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const subtasks: Subtask[] = [
    {
        description: 'subtask description short',
        completed: false, 
    },
    {
        description: 'subtask description long subtask description long subtask description long subtask description long subtask description long subtask description long subtask description long subtask description long',
        completed: true, 
    }
]

export const Primary: Story = {
  args: {
    title: 'title of this task',
    description: 'this is the description of the task',
    subtasks: subtasks,
    status: 'doing'
  },
};

export const LongTitleAndDescription: Story = {
    args: {
      title: 'title of this task title of this task title of this task title of this task title of this task title of this task',
      description: 'this is the description of the task this is the description of the task this is the description of the task this is the description of the task this is the description of the task this is the description of the task this is the description of the task',
      subtasks: subtasks,
      status: 'done'
    },
  };
    