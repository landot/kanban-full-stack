import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './SubtaskCheckbox';

const meta = {
  title: 'Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotComplete: Story = {
  args: {
    subtask: {
      id: 'asdf',
      title: 'subtask title',
      isCompleted: false
    },
  },
};

export const Completed: Story = {
    args: {
      subtask: {
        id: 'asdf',
        title: 'subtask title',
        isCompleted: true
      },
    },
};  
  