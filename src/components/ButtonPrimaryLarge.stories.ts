import type { Meta, StoryObj } from '@storybook/react';

import { ButtonPrimaryLarge } from './ButtonPrimaryLarge';

const meta = {
  title: 'buttons/ButtonPrimaryLarge',
  component: ButtonPrimaryLarge,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof ButtonPrimaryLarge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    color: '#FFFFFF',
    backgroundColor: '#635FC7',
    hoverColor: '#A8A4FF',
    label: 'Button Primary (L)'
  },
};
