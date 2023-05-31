import type { Meta, StoryObj } from '@storybook/react';

import { DarkModeToggle } from './DarkModeToggle';

const meta = {
  title: 'DarkModeToggle',
  component: DarkModeToggle,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {},
} satisfies Meta<typeof DarkModeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
