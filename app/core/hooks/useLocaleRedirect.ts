import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useLocaleRedirect = (nextLocale: string | false) => {
  const router = useRouter();
  const {
    pathname,
    asPath,
    query,
    locale,
  } = router;

  useEffect(() => {
    if (nextLocale !== locale) {
      router.push({
        pathname,
        query,
      }, asPath, { locale: nextLocale });
    }
  }, []);
};
