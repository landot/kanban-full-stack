import type { Meta, StoryObj } from '@storybook/react';
import { sampleBoard } from '../data/sampleData';

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
    boards: [sampleBoard],
    selectedBoardIndex: 1
  },
};

