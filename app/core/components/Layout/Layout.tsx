import Head from 'next/head';
import { ReactNode } from 'react';

import { MainMenu } from '@/core/components/Layout/MainMenu';
import { User } from '@/core/components/Layout/Header/User';
import {
  ContentWrapper,
  PageFooter,
  PageHeader,
  PageWrapper,
} from '@/core/components/Layout/Layout.styles';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <PageWrapper>
    <Head>
      <title key="title">Example Title</title>
    </Head>

    <PageHeader>
      <MainMenu />
      <User />
    </PageHeader>

    <ContentWrapper>
      {children}
    </ContentWrapper>

    <PageFooter>
      <p>Footer</p>
    </PageFooter>
  </PageWrapper>
);
