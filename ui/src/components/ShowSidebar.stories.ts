import type { Meta, StoryObj } from '@storybook/react';

import { ShowSidebar } from './ShowSidebar';

const meta = {
  title: 'ShowSidebar',
  component: ShowSidebar,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ShowSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

