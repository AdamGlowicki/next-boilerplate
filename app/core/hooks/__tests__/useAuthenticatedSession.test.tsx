import { render } from 'tests/utils';
import nextAuth from 'next-auth/react';
import { Session as SessionType } from 'next-auth';
import { cleanup } from '@testing-library/react';

import { RefreshContext } from '@/core/components/Session';
import { LoginStatesValues } from '@/core/constants/constants';
import { useAuthenticatedSession } from '@/core/hooks/useAuthenticatedSession';

const callback = jest.fn();

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

const TestComponent = () => {
  useAuthenticatedSession(callback, []);

  return (
    <div>test</div>
  );
};

describe('useAuthenticatedSession hook', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('Runs the callback when the session is not refreshing and the status is authenticated', () => {
    const useSession = jest.spyOn(nextAuth, 'useSession');

    useSession.mockReturnValueOnce(mockSession);
    render(
      <RefreshContext.Provider value={false}>
        <TestComponent />
      </RefreshContext.Provider>
    );

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('Does not run the callback when the session is refreshing', () => {
    const useSession = jest.spyOn(nextAuth, 'useSession');

    useSession.mockReturnValueOnce(mockSession);
    render(
      <RefreshContext.Provider value>
        <TestComponent />
      </RefreshContext.Provider>
    );

    expect(callback).not.toHaveBeenCalled();
  });

  it('Does not run the callback when the user is not authenticated', () => {
    const useSession = jest.spyOn(nextAuth, 'useSession');

    useSession.mockReturnValueOnce({
      data: null,
      status: LoginStatesValues.UNAUTHENTICATED,
    });
    render(
      <RefreshContext.Provider value={false}>
        <TestComponent />
      </RefreshContext.Provider>
    );

    expect(callback).not.toHaveBeenCalled();
  });
});
