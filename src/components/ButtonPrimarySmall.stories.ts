import type { Meta, StoryObj } from '@storybook/react';

import { ButtonPrimarySmall } from './ButtonPrimarySmall';

const meta = {
  title: 'buttons/ButtonPrimarySmall',
  component: ButtonPrimarySmall,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ButtonPrimarySmall>;

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

export const Secondary: Story = {
    args: {
        color: '#635FC7',
        backgroundColor: 'rgba(99, 95, 199, 0.1);',
        hoverColor: 'rgba(99, 95, 199, 0.25);',
        label: 'Button Secondary (S)'
    },
};

  export const Destructive: Story = {
    args: {
      color: '#FFFFFF',
      backgroundColor: '#EA5555',
      hoverColor: '#FF9898',
      label: 'Button Destructive (S)'
    },
};
  