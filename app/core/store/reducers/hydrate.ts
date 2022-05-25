import { HYDRATE } from 'next-redux-wrapper';
import {
  diff,
  DiffPatcher,
  patch,
} from 'jsondiffpatch';
import {
  AnyAction,
  createReducer,
} from '@reduxjs/toolkit';

import { RootState } from '@/core/interfaces/store';

export const initialState = {} as RootState;

export const hydrateReducer = createReducer(
  initialState,
  builder => builder.addCase(HYDRATE, (state, action: AnyAction) => {
    if (state?.config?.appInitialized) return state;

    const jsondiffpatch = new DiffPatcher();
    const stateDiff = diff(state, action.payload);
    const clonedPayload = jsondiffpatch.clone(state);

    if (stateDiff) {
      patch(clonedPayload, stateDiff);
    }

    return {
      ...state,
      ...clonedPayload,
    };
  })
);
