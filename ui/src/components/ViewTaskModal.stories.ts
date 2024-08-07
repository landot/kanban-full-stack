import type { Meta, StoryObj } from '@storybook/react';
import { sampleBoard } from '../data/sampleData';
import { Subtask } from '../types/data';

import { ViewTaskModal } from './ViewTaskModal';

// todo fix these stories
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
        id: 'asdf',
        title: 'subtask 1',
        isCompleted: false, 
    },
    {
      id: '1234',
      title: 'subtask 2 subtask 2 subtask 2 subtask 2 subtask 2 subtask 2 subtask 2 subtask 2 subtask 2 subtask 2 subtask 2 subtask 2 subtask 2 subtask 2',
      isCompleted: false, 
    }
]

export const Primary: Story = {
  args: {
    task: {
      id: 'aaaaa',
      title: 'title of this task',
      description: 'this is the description of the task',
      subtasks: subtasks,
      status: 'doing'
    },
    statuses: ['doing', 'done'],
    board: sampleBoard
  },
};

export const LongTitleAndDescription: Story = {
    args: {
      task: {
        id: 'aaaaa',
        title: 'title of this task title of this task title of this task title of this task title of this task title of this task',
        description: 'this is the description of the task this is the description of the task this is the description of the task this is the description of the task this is the description of the task this is the description of the task this is the description of the task',
        subtasks: subtasks,
        status: 'done'
      },
      statuses: ['doing', 'done'],
      board: sampleBoard
    },
  };
    