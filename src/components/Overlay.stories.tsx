import type { Meta, StoryObj } from '@storybook/react';

import { Overlay } from './Overlay';

const meta = {
  title: 'Overlay',
  component: Overlay,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {},
} satisfies Meta<typeof Overlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
    <div style={{backgroundColor: 'white', width: '500px', height: '500px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
      <p>this is the inner component</p>
    </div>
    )
  },
};
