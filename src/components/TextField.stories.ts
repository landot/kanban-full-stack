import type { Meta, StoryObj } from '@storybook/react';

import { TextField } from './TextField';

const meta = {
  title: 'TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoTextTyped: Story = {
  args: {
    showValidationError: false,
    placeholder: 'this is the placeholder',
    value: ''
  },
};

export const WithText: Story = {
  args: {
    showValidationError: false,
    placeholder: 'this is the placeholder',
    value: 'this is text'
  },
};

export const WithError: Story = {
    args: {
        showValidationError: true,
        placeholder: 'this is the placeholder',
        value: ''
    },
  };

  