import type { Meta, StoryObj } from '@storybook/react';
import { CreateBoardModal } from './CreateBoardModal';

const meta = {
  title: 'CreateBoardModal',
  component: CreateBoardModal,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CreateBoardModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
