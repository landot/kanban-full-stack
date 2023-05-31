import type { Meta, StoryObj } from '@storybook/react';

import { SidebarBoard } from './SidebarBoard';

const meta = {
  title: 'SidebarBoard',
  component: SidebarBoard,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SidebarBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Selected: Story = {
  args: {
    text: 'Platform Launch',
    selected: true,
  },
};

export const NotSelected: Story = {
    args: {
      text: 'Platform Launch',
      selected: false,
    },
};
