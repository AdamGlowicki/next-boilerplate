import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { Action } from 'redux';
import { useDispatch } from 'react-redux';
import {
  ThunkAction,
  ThunkDispatch,
} from 'redux-thunk';

import { rootReducer } from '@/core/store/reducers/root';
import { RootState } from '@/core/interfaces/store';

const storeConfig = {
  devTools: process.env.NODE_ENV === 'development',
  reducer: rootReducer,
};

export const createStore = () => configureStore(storeConfig);
export const createStoreWithPreloadedState = (
  preloadedState: RootState
) => configureStore({
  ...storeConfig,
  preloadedState,
});

const store = createStore();

if (module.hot) {
  module.hot.accept('./reducers/root.ts', () => {
    const nextReducer = rootReducer;

    store.replaceReducer(nextReducer);
  });
}

export const useAppDispatch = () => useDispatch<AppDispatch>();
const makeStore = () => store;

export const wrapper = createWrapper<AppStore>(makeStore);

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = typeof store.dispatch
export type AppThunk<R = void> = ThunkAction<R, RootState, null, Action<string>>;
export type AppThunkDispatch = ThunkDispatch<RootState, null, Action<string>>;
