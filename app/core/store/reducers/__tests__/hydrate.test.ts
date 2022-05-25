import { HYDRATE } from 'next-redux-wrapper';

import { RootState } from '@/core/interfaces/store';

import {
  hydrateReducer,
  initialState,
} from '../hydrate';

describe('Hydrate reducer', () => {
  it('should return the initial state', () => {
    expect(hydrateReducer(undefined, { type: 'invalid action ' })).toEqual(initialState);
  });

  it('returns current state if the app has been initialized', () => {
    const state = {
      config: {
        appHydrated: false,
        appInitialized: true,
      },
    } as RootState;

    expect(hydrateReducer(state, {
      payload: {
        config: {
          appHydrated: true,
          appInitialized: true,
        },
      },
      type: HYDRATE,
    })).toEqual(state);
  });

  it('returns unpatched state if there are no differences', () => {
    const state = {
      config: {
        appHydrated: false,
        appInitialized: false,
      },
    } as RootState;

    expect(hydrateReducer(state, {
      payload: {
        config: {
          appHydrated: false,
          appInitialized: false,
        },
      },
      type: HYDRATE,
    })).toEqual(state);
  });

  it('returns patched state', () => {
    const state = {
      config: {
        appHydrated: false,
        appInitialized: false,
      },
    } as RootState;

    const newState = {
      config: {
        appHydrated: true,
        appInitialized: false,
      },
    } as RootState;

    expect(hydrateReducer(state, {
      payload: newState,
      type: HYDRATE,
    })).toEqual(newState);
  });
});
