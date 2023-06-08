import type { Meta, StoryObj } from '@storybook/react';
import { ButtonLarge } from './ButtonLarge';

const meta = {
  title: 'buttons/ButtonLarge',
  component: ButtonLarge,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ButtonLarge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Button Primary (L)',
    isDisabled: false
  },
};


export const DisabledButton: Story = {
  args: {
    label: 'Button Primary (L)',
    isDisabled: true
  },
};