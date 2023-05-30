import type { Meta, StoryObj } from '@storybook/react';
import { SubtaskMoreAction } from './SubtaskMoreAction';

const meta = {
  title: 'SubtaskMoreAction',
  component: SubtaskMoreAction,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SubtaskMoreAction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
