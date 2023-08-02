import type { Meta, StoryObj } from '@storybook/react';
import { Message } from './Message';
import { AuthContext } from '../context/AuthContext';
import { IdTokenResult, User } from 'firebase/auth';

const fakeGuestAuthData: User = {
  isAnonymous: true,
  email: null,
  uid: "asdfasdf",
  emailVerified: false,
  metadata: {},
  providerData: [],
  refreshToken: '',
  tenantId: '',
  displayName: '',
  phoneNumber: '',
  photoURL: '',
  providerId: '',
  delete: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  getIdToken: function (): Promise<string> {
    throw new Error('Function not implemented.');
  },
  getIdTokenResult: function (): Promise<IdTokenResult> {
    throw new Error('Function not implemented.');
  },
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  toJSON: function (): object {
    throw new Error('Function not implemented.');
  }
};

const fakeAuthData: User = {
  ...fakeGuestAuthData,
  isAnonymous: false,
  email: 'email@email.emailasdf'
};

const meta = {
  title: 'Message',
  component: Message,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Message>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GuestAccount: Story = {
  args: {}
};
GuestAccount.decorators = [
    (Story) => (
      <AuthContext.Provider value={fakeGuestAuthData}>
        <Story />
      </AuthContext.Provider>
  ),
];



export const LoggedInAccount: Story = {
  args: {}
};
LoggedInAccount.decorators = [
    (Story) => (
      <AuthContext.Provider value={fakeAuthData}>
        <Story />
      </AuthContext.Provider>
  ),
];
