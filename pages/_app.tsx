import { useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'styled-components';
import omit from 'lodash/omit';

import {
  useAppDispatch,
  wrapper,
} from '@/core/store/store';
import { Layout } from '@/core/components/Layout';
import { Session } from '@/core/components/Session';
import { initializeApp } from '@/core/store/actions';
import { Translation } from '@/core/components/Translation';
import { useTheme } from '@/core/hooks/useTheme';

import { Loader } from '@/features/Loader/conponents';

import { GlobalStyle } from '@/themes/globalStyles';

const MyApp = ({
  Component,
  pageProps,
}: AppProps) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  useEffect(() => {
    dispatch(initializeApp());
  }, []);

  const cleanedPageProps = omit(pageProps, ['messages']);

  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={{ ...theme }}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1"
          />
        </Head>
        <GlobalStyle />
        <Loader />
        <Translation serverMessages={pageProps?.messages}>
          <Layout>
            <Session>
              <Component {...cleanedPageProps} />
            </Session>
          </Layout>
        </Translation>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default wrapper.withRedux(MyApp);
