import { createReducer } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { ConfigState } from '@/core/interfaces/state';

import { initializeApp } from '../actions';

export const initialState: ConfigState = {
  appHydrated: false,
  appInitialized: false,
};

export const configReducer = createReducer(
  initialState,
  builder => builder
    .addCase(HYDRATE, state => {
      state.appHydrated = true;
    })
    .addCase(initializeApp, state => {
      state.appInitialized = true;
    })
);

