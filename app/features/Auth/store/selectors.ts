import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/core/interfaces/store';

import { AuthState } from '@/features/Auth/interfaces/state';

const featureStateSelector = (state: RootState): AuthState => state.auth;

export const getHydrateUserStatusSelector = createSelector(
  featureStateSelector,
  state => state.hydrateUserStatus
);

export const getUserSelector = createSelector(
  featureStateSelector,
  state => state.user
);

export const isUserLoggedSelector = createSelector(
  featureStateSelector,
  state => !!state.user?.id
);
