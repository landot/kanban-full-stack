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
        task: {
            description: 'Design settings and search pages',
            id: 'adsf',
            title: 'task title',
            status: 'todo',
            subtasks: [
                {
                    title: 'subtask title1',
                    id: '123',
                    isCompleted: true
                },
                {
                    title: 'subtask title2',
                    id: '1234',
                    isCompleted: false
                },
                {
                    title: 'subtask title3',
                    id: '12345',
                    isCompleted: false
                }
            ]
        }
    },
};

export const NoSubtasksRemaining: Story = {
    args: {
        task: {
            description: 'Design settings and search pages',
            id: 'adsf',
            title: 'task title',
            status: 'todo',
            subtasks: [
                {
                    title: 'subtask title1',
                    id: '123',
                    isCompleted: true
                },
                {
                    title: 'subtask title2',
                    id: '1234',
                    isCompleted: true
                },
                {
                    title: 'subtask title3',
                    id: '12345',
                    isCompleted: true
                }
            ]
        }
    },
};

export const LongTitle: Story = {
    args: {
        task: {
            description: 'Design settings and search pages',
            id: 'adsf',
            title: 'task title and search pages and search pages and search pages and search pages and search pages and search pages and search pages and search pages and search pages and search pages and search pages and search pages and search pages and search pages and search pages',
            status: 'todo',
            subtasks: [
                {
                    title: 'subtask title1',
                    id: '123',
                    isCompleted: true
                },
                {
                    title: 'subtask title2',
                    id: '1234',
                    isCompleted: false
                },
                {
                    title: 'subtask title3',
                    id: '12345',
                    isCompleted: false
                }
            ]
        }
    },
};
