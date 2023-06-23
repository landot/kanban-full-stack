import type { Meta, StoryObj } from '@storybook/react';
import { MoreAction } from './MoreAction';

const meta = {
  title: 'MoreAction',
  component: MoreAction,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof MoreAction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Board: Story = {
  args: {
    actionItemName: 'Board',
    items: [
      {
        text: 'Edit Board',
        class: 'edit',
        action: () => null
    },
    {
        text: 'Delete Board',
        class: 'delete',
        action: () => null
    },
    ]
  },
};
