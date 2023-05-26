import { Meta, StoryObj } from '@storybook/react';

import { Task } from './Task';

const meta = {
  title: 'Task',
  component: Task,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Task>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        description: 'Design settings and search pages',
        subtasksRemaining: 1,
        subtasksTotal: 3
    },
};

export const NoTasksRemaining: Story = {
    args: {
        description: 'Design settings and search pages',
        subtasksRemaining: 0,
        subtasksTotal: 3
    },
};

export const LongDescription: Story = {
    args: {
        description: 'Design settings and search pages Design settings and search pages Design settings and search pages Design settings and search pages Design settings and search pages Design settings and search pages',
        subtasksRemaining: 0,
        subtasksTotal: 3
    },
};
