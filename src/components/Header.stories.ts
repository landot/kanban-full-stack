import type { Meta, StoryObj } from '@storybook/react';

import { Header } from './Header';

const meta = {
  title: 'Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    board: {id: 'asdf', name: 'Board 1', columns: [{id: 'asdf', name: 'column1', color: '#FFFFFF', tasks: []}]},
    showLogo: true
  },
};

export const NoLogo: Story = {
  args: {
    board: {id: 'asdf', name: 'Board 1', columns: [{id: 'asdf', name: 'column1', color: '#FFFFFF', tasks: []}]},
    showLogo: false
  },
};

export const NoBoardsWithLogo: Story = {
  args: {
    board: {id: '', name: '', columns: []},
    showLogo: true
  },
};

export const NoBoardsNoLogo: Story = {
  args: {
    board: {id: '', name: '', columns: []},
    showLogo: false
  },
};
