import type { Meta, StoryObj } from '@storybook/react';

import { Dropdown } from './Dropdown';

const meta = {
  title: 'Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    values: ['doing', 'done'],
    value: 'doing'
  },
};

