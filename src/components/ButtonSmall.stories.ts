import type { Meta, StoryObj } from '@storybook/react';

import { ButtonSmall } from './ButtonSmall';

const meta = {
  title: 'buttons/ButtonSmall',
  component: ButtonSmall,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ButtonSmall>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: 'primary',
    label: 'Button Primary (s)'
  },
};

export const Secondary: Story = {
    args: {
      type: 'secondary',
      label: 'Button Secondary (s)'
    },
};

export const Destructive: Story = {
    args: {
      type: 'destructive',
      label: 'Button Destructive (s)'
    },
};

// export const Secondary: Story = {
//     args: {
//         color: '#635FC7',
//         backgroundColor: 'rgba(99, 95, 199, 0.1);',
//         hoverColor: 'rgba(99, 95, 199, 0.25);',
//         label: 'Button Secondary (S)'
//     },
// };

//   export const Destructive: Story = {
//     args: {
//       color: '#FFFFFF',
//       backgroundColor: '#EA5555',
//       hoverColor: '#FF9898',
//       label: 'Button Destructive (S)'
//     },
// };
  