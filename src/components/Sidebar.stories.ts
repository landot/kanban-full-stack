import type { Meta, StoryObj } from '@storybook/react';

import { Sidebar } from './Sidebar';

const meta = {
  title: 'Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    boards: ['Platform Launch', 'Marketing Plan', 'Roadmap'],
    selectedBoardIndex: 1
  },
};

