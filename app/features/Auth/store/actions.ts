import {
  createAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import { api } from '@/features/Auth/api';
import { User } from '@/features/Auth/interfaces';

import { getActionPrefix } from '@/utils/helpers';

const actionPrefix = getActionPrefix('auth');

export const getUser = createAsyncThunk(
  `${actionPrefix}/get-user`, async () => {
    const { data } = await api.getUser();

    return data;
  }
);

export const setUser = createAction(
  `${actionPrefix}/setUser`,
  (payload: User) => ({
    payload,
  })
);

export const logout = createAction(
  `${actionPrefix}/logout`
);
