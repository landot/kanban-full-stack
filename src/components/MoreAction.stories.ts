import type { Meta, StoryObj } from '@storybook/react';
import { MoreAction } from './MoreAction';

const meta = {
  title: 'SubtaskMoreAction',
  component: MoreAction,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof MoreAction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
