import type { Meta, StoryObj } from '@storybook/react';
import { SignInPage } from './SignInPage';

const meta = {
  title: 'SignInPage',
  component: SignInPage,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SignInPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};