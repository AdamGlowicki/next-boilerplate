import { useLocaleRedirect } from '@/core/hooks/useLocaleRedirect';

import { GetServerSideProps } from 'next';

import { Auth } from '@/features/Auth';

type SignInProps = {
  nextLocale: string | false;
}

export default function SignIn({ nextLocale }: SignInProps) {
  useLocaleRedirect(nextLocale);

  return (
    <Auth />
  );
}

// return props with NEXT_LOCALE cookie to prevent locale change when redirected to /login
export const getServerSideProps: GetServerSideProps = async ({ req: { cookies } }) => ({
  props: {
    nextLocale: cookies?.NEXT_LOCALE || false,
  },
});

