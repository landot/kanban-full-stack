import type { Meta, StoryObj } from '@storybook/react';

import { EmptyBoard } from './EmptyBoard';

const meta = {
  title: 'EmptyBoard',
  component: EmptyBoard,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof EmptyBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

