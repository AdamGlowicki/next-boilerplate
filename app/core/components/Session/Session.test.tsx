import { render } from 'tests/utils';
import nextAuth from 'next-auth/react';
import { Session as SessionType } from 'next-auth';
import {
  cleanup,
  waitFor,
} from '@testing-library/react';

import { LoginStatesValues } from '@/core/constants/constants';

import * as utilsJwt from '@/utils/jwt';
import { request } from '@/utils/request';

import { Session } from './Session';

const mockSessionData: SessionType = {
  accessToken: 'access-token',
  expires: `${Date.now() + 1000 * 60 * 60}`,
  refreshToken: 'refresh-token',
};

const mockSession: ReturnType<typeof nextAuth.useSession> = {
  data: {
    ...mockSessionData,
    error: undefined,
  },
  status: LoginStatesValues.AUTHENTICATED,
};

jest.mock('@/utils/jwt', () => ({
  isTokenCloseToExpiry: jest.fn(() => false),
}));

jest.mock('@/utils/request', () => ({
  request: {
    removeTokens: jest.fn,
    setAuthorizationToken: jest.fn,
  },
}));

const renderSession = () => render(<Session>test</Session>);

describe('Session component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(cleanup);

  it('Renders', () => {
    renderSession();
  });

  it('Calls signOut on RefreshTokenAccessError', () => {
    const useSession = jest.spyOn(nextAuth, 'useSession');
    const signOut = jest.spyOn(nextAuth, 'signOut');

    useSession.mockReturnValueOnce({
      ...mockSession,
      data: {
        ...mockSession.data,
        error: 'RefreshAccessTokenError',
      },
    });

    renderSession();

    expect(signOut).toHaveBeenCalledTimes(1);
  });

  it("Refreshes the token when it's close to expiry, sets it in the request", async () => {
    const isTokenCloseToExpiry = jest.spyOn(utilsJwt, 'isTokenCloseToExpiry');
    const setAuthorizationToken = jest.spyOn(request, 'setAuthorizationToken');
    const useSession = jest.spyOn(nextAuth, 'useSession');
    const getSession = jest.spyOn(nextAuth, 'getSession');

    isTokenCloseToExpiry.mockReturnValueOnce(true);
    useSession.mockReturnValueOnce(mockSession);
    getSession.mockResolvedValueOnce({
      accessToken: 'access',
      expires: '',
      refreshToken: 'refresh',
    });

    renderSession();

    await waitFor(() => {
      expect(getSession).toHaveBeenCalledTimes(1);
      expect(setAuthorizationToken).toHaveBeenCalledWith('access');
    });
  });

  it("Does not refresh the token when there's no accessToken on new session", async () => {
    const isTokenCloseToExpiry = jest.spyOn(utilsJwt, 'isTokenCloseToExpiry');
    const setAuthorizationToken = jest.spyOn(request, 'setAuthorizationToken');
    const useSession = jest.spyOn(nextAuth, 'useSession');
    const getSession = jest.spyOn(nextAuth, 'getSession');

    isTokenCloseToExpiry.mockReturnValueOnce(true);
    useSession.mockReturnValueOnce(mockSession);
    getSession.mockResolvedValueOnce({
      accessToken: '',
      expires: '',
      refreshToken: 'refresh',
    });

    renderSession();

    await waitFor(() => {
      expect(getSession).toHaveBeenCalledTimes(1);
      expect(setAuthorizationToken).not.toHaveBeenCalled();
    });
  });

  it('Removes the tokens from the request instance if there are not tokens in the session', () => {
    const removeTokens = jest.spyOn(request, 'removeTokens');
    const useSession = jest.spyOn(nextAuth, 'useSession');

    useSession.mockImplementationOnce(() => ({
      data: null,
      status: 'loading',
    }));

    renderSession();

    expect(removeTokens).toHaveBeenCalledTimes(1);
  });
});
