import type { Meta, StoryObj } from '@storybook/react';

import { CreateAccountPage } from './CreateAccountPage';

const meta = {
  title: 'CreateAccountPage',
  component: CreateAccountPage,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {},
} satisfies Meta<typeof CreateAccountPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
