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
    icon: 'board'
  },
};

export const NotSelectedBoard: Story = {
    args: {
      text: 'Platform Launch',
      selected: false,
      icon: 'board'
    },
};

export const NotSelectedHide: Story = {
  args: {
    text: 'Hide Sidebar',
    selected: false,
    icon: 'hide'
  },
};
