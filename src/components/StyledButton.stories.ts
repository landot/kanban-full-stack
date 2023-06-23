import type { Meta, StoryObj } from '@storybook/react';
import { StyledButton, LargePrimary, LargeSecondary, SmallSecondary, SmallPrimary, LargeDestructive, SmallDestructive } from './StyledButton';

const meta = {
  title: 'StyledButton',
  component: StyledButton,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof StyledButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryLarge: Story = {
  args: {
    label: 'PrimaryLarge',
    isDisabled: false,
    buttonProps: LargePrimary
  },
};


export const PrimarySmall: Story = {
  args: {
    label: 'PrimarySmall',
    isDisabled: false,
    buttonProps: SmallPrimary
  },
};

export const PrimaryLargeDisabled: Story = {
  args: {
    label: 'PrimaryLarge',
    isDisabled: true,
    buttonProps: LargePrimary
  },
};


export const PrimarySmallDisabled: Story = {
  args: {
    label: 'PrimarySmall',
    isDisabled: true,
    buttonProps: SmallPrimary
  },
};

export const SecondaryLarge: Story = {
  args: {
    label: 'SecondaryLarge',
    isDisabled: false,
    buttonProps: LargeSecondary
  },
};


export const SecondarySmall: Story = {
  args: {
    label: 'SecondarySmall',
    isDisabled: false,
    buttonProps: SmallSecondary
  },
};

export const SecondaryLargeDisabled: Story = {
  args: {
    label: 'SecondaryLarge',
    isDisabled: true,
    buttonProps: LargeSecondary
  },
};


export const SecondarySmallDisabled: Story = {
  args: {
    label: 'SecondarySmall',
    isDisabled: true,
    buttonProps: SmallSecondary
  },
};


export const DestructiveLarge: Story = {
  args: {
    label: 'DestructiveLarge',
    isDisabled: false,
    buttonProps: LargeDestructive
  },
};


export const DestructiveSmall: Story = {
  args: {
    label: 'DestructiveSmall',
    isDisabled: false,
    buttonProps: SmallDestructive
  },
};

export const DestructiveLargeDisabled: Story = {
  args: {
    label: 'DestructiveLarge',
    isDisabled: true,
    buttonProps: LargeDestructive
  },
};


export const DestructiveSmallDisabled: Story = {
  args: {
    label: 'DestructiveSmall',
    isDisabled: true,
    buttonProps: SmallDestructive
  },
};