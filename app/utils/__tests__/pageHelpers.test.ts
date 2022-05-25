import 'mocks/next-auth/react';
import nextAuth from 'next-auth/react';

import {
  getUserFromContext,
  getUserFromSession,
} from '@/utils/pageHelpers';

const exampleUser = {
  email: 'email',
  id: 0,
  username: 'username',
};

const exampleSession = {
  accessToken: 'access',
  expires: '',
  refreshToken: 'refresh',
};

jest.mock('@/features/Auth/api', () => ({
  makeServerSideApi: jest.fn(() => ({
    getUser: jest.fn(() => ({ data: exampleUser })),
  })),
}));

describe('pageHelpers', () => {
  beforeEach(jest.clearAllMocks);

  describe('getUserFromSession', () => {
    it('returns null if no session is passed', async () => {
      expect(await getUserFromSession(null)).toBeNull();
    });

    it('returns null if no access token is present', async () => {
      expect(await getUserFromSession({
        accessToken: null,
        expires: '',
        refreshToken: null,
      })).toBeNull();
    });

    it('returns the user if access token is present', async () => {
      expect(await getUserFromSession(exampleSession)).toEqual(exampleUser);
    });
  });

  describe('getUserFromContext', () => {
    it('calls getSession and returns the user object', async () => {
      const getSession = jest.spyOn(nextAuth, 'getSession');

      getSession.mockResolvedValueOnce(exampleSession);

      expect(await getUserFromContext({})).toEqual(exampleUser);
      expect(getSession).toHaveBeenCalled();
    });
  });
});
