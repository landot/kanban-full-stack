import type { Meta, StoryObj } from '@storybook/react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Status } from '../types/data';

import { Column } from './Column';

const meta = {
  title: 'Column',
  component: Column,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Column>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    decorators: [
        (Story) => (
            <DragDropContext onDragEnd={() => null}>
            <Story />
            </DragDropContext>
        ),
    ],
    args: {
        name: 'Todo',
        id: 'col1',
        color: '#bbb',
        tasks: [
            {
                id: '5555',
                title: 'Build UI for onboarding',
                description: 'this is the description for the task asdfasdfasdfasfd',
                status: Status.Todo,
                subtasks: [
                    {
                        id: '123456',
                        title: 'create design for UI',
                        isCompleted: true
                    },
                    {
                        id: '123457',
                        title: 'develop MVP',
                        isCompleted: false
                    },
                    {
                        id: '123458',
                        title: 'test MVP',
                        isCompleted: false
                    }
                ]
            },
            {
                id: '6666',
                title: 'Test new UI',
                description: 'this is the description for the task asdfasdfasdfasfd',
                status: Status.Todo,
                subtasks: [
                    {
                        id: '1123456',
                        title: 'accessibility testing',
                        isCompleted: true
                    },
                    {
                        id: '1123457',
                        title: 'performance testing',
                        isCompleted: false
                    },
                    {
                        id: '1123458',
                        title: 'sign off from QA',
                        isCompleted: false
                    }
                ]
            }
        ]
    },
};
