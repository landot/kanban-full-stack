import type { Meta, StoryObj } from '@storybook/react';
import { SignInPage } from './Auth';

const meta = {
  title: 'Auth',
  component: SignInPage,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SignInPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};