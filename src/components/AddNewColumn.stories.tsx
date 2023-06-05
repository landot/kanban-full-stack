import type { Meta, StoryObj } from '@storybook/react';

import { AddNewColumn } from './AddNewColumn';

const meta = {
  title: 'AddNewColumn',
  component: AddNewColumn,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof AddNewColumn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div style={{width: '280px', height: '500px'}}>
        <Story />
      </div>
    ),
],
};

