import { ReactNode } from 'react';
import nextAuth from 'next-auth/react';

import { LoginStatesValues } from '@/core/constants/constants';

const mockSession: ReturnType<typeof nextAuth.useSession> = {
  data: null,
  status: LoginStatesValues.UNAUTHENTICATED,
};

export default jest.mock('next-auth/react', () => ({
  SessionProvider: ({ children }: { children: ReactNode }) => children,
  getSession: jest.fn(() => mockSession.data),
  signOut: jest.fn(),
  useSession: jest.fn(() => mockSession),
}));
