import { HYDRATE } from 'next-redux-wrapper';

import { initializeApp } from '@/core/store/actions/config';

import {
  configReducer,
  initialState,
} from '../config';

describe('Config reducer', () => {
  it('returns the initial state', () => {
    expect(configReducer(undefined, { type: 'invalid action' })).toEqual(initialState);
  });

  it('sets appHydrated field', () => {
    expect(configReducer(initialState, { type: HYDRATE })).toMatchObject({
      appHydrated: true,
    });
  });

  it('sets appInitialized field', () => {
    expect(configReducer(initialState, { type: initializeApp })).toMatchObject({
      appInitialized: true,
    });
  });
});
