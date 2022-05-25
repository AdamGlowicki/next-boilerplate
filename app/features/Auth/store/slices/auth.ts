import {
  ActionReducerMapBuilder,
  createSlice,
} from '@reduxjs/toolkit';

import { RequestStatus } from '@/core/interfaces/common';

import { AuthState } from '@/features/Auth/interfaces';
import {
  getUser,
  logout,
  setUser,
} from '@/features/Auth/store';

export const initialState: AuthState = {
  hydrateUserStatus: RequestStatus.IDLE,
  user: null,
};

const authSlice = createSlice({
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
    builder
      .addCase(getUser.pending, state => {
        state.hydrateUserStatus = RequestStatus.LOADING;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.hydrateUserStatus = RequestStatus.SUCCEEDED;
        state.user = payload;
      })
      .addCase(getUser.rejected, state => {
        state.hydrateUserStatus = RequestStatus.FAILED;
      })
      .addCase(logout, state => {
        state.user = null;
      })
      .addCase(setUser, (state, action) => {
        state.user = action.payload;
      });
  },
  initialState,
  name: 'auth',
  reducers: {},
});

export default authSlice.reducer;
