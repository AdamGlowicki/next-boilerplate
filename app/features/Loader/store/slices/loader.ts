import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

export interface LoaderState {
  isLoading: boolean;
}

const initialState: LoaderState = {
  isLoading: false,
};

const loaderSlice = createSlice({
  initialState,
  name: 'loader',
  reducers: {
    toggleLoader: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
  },
});

export default loaderSlice.reducer;

export const { toggleLoader } = loaderSlice.actions;
