/* eslint-disable react/require-default-props */
// auto-mock this as the SessionProvider will throw errors otherwise
import 'mocks/next-auth/react';

import {
  ReactElement,
  ReactNode,
} from 'react';
import { Provider } from 'react-redux';
import { createNextState } from '@reduxjs/toolkit';
import {
  DefaultTheme,
  ThemeProvider,
} from 'styled-components';
import { SessionProvider } from 'next-auth/react';
import { Session as SessionType } from 'next-auth';
import {
  render,
  RenderOptions,
} from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import {
  createStore,
  createStoreWithPreloadedState,
} from '@/core/store/store';
import { RootState } from '@/core/interfaces/store';
import { Nullable } from '@/core/interfaces/common';
import { ThemeDirection } from '@/core/constants/constants';

import { theme as defaultTheme } from '@/themes/main';

type Props = {
  children?: ReactNode;
};

type MergeStateFunction = (current: RootState) => RootState | void;
type ProviderValues = {
  locale?: string;
  theme?: DefaultTheme;
  session?: Nullable<SessionType>;
  storeState?: MergeStateFunction;
};

const defaultProviderValues: Required<ProviderValues> = {
  locale: 'en',
  session: null,
  storeState: state => state,
  theme: {
    ...defaultTheme,
    direction: ThemeDirection.LTR,
  },
};

const getStoreState = (
  storeState: MergeStateFunction,
  initialState = createStore().getState()
) => createNextState(initialState, draft => storeState(draft));

const getProviders = (values?: ProviderValues) => ({ children }: Props) => {
  const storeState = values?.storeState ?? defaultProviderValues.storeState;
  const store = createStoreWithPreloadedState(getStoreState(storeState));

  return (
    <Provider store={store}>
      <ThemeProvider theme={values?.theme ?? defaultProviderValues.theme}>
        <SessionProvider session={values?.session ?? defaultProviderValues.session}>
          <IntlProvider locale={values?.locale ?? defaultProviderValues.locale}>
            {children}
          </IntlProvider>
        </SessionProvider>
      </ThemeProvider>
    </Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
  providerValues?: ProviderValues
) => render(ui, {
  wrapper: getProviders(providerValues),
  ...options,
});

export * from '@testing-library/dom';
export { customRender as render };
