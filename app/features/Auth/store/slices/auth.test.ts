import { RequestStatus } from '@/core/interfaces/common';

import auth, { initialState } from '@/features/Auth/store/slices/auth';
import {
  getUser,
  logout,
  setUser,
} from '@/features/Auth/store';

describe('Auth reducer', () => {
  it('returns the initial state', () => {
    expect(auth(undefined, { type: 'invalid action' })).toEqual(initialState);
  });

  it('sets the hydrateUserStatus properly', () => {
    expect(auth(initialState, { type: getUser.pending })).toMatchObject({
      hydrateUserStatus: RequestStatus.LOADING,
    });
    expect(auth(initialState, { type: getUser.fulfilled })).toMatchObject({
      hydrateUserStatus: RequestStatus.SUCCEEDED,
    });
    expect(auth(initialState, { type: getUser.rejected })).toMatchObject({
      hydrateUserStatus: RequestStatus.FAILED,
    });
  });

  it('logs the user out', () => {
    expect(auth(initialState, { type: logout })).toMatchObject({
      ...initialState,
      user: null,
    });
  });

  it('sets the user', () => {
    const user = {
      email: 'email',
      id: 1,
      username: 'username',
    };

    expect(auth(initialState, {
      payload: user,
      type: setUser,
    })).toMatchObject({ user });
  });
});
