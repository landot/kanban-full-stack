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
    text: 'Test',
    completed: false
  },
};

export const Completed: Story = {
    args: {
        text: 'Test',
        completed: true
    },
};  
  