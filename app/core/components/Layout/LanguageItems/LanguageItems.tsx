import { useCallback } from 'react';
import { FormattedDisplayName } from 'react-intl';
import { useRouter } from 'next/router';

import {
  MenuItem,
  MenuLink,
  MenuList,
} from '../MainMenu/MainMenu.styles';

export const LanguageItems = () => {
  const router = useRouter();
  const {
    pathname,
    asPath,
    query,
    locales,
  } = router;

  const handleIntlChange = useCallback((locale: string) => () => {
    router.push({
      pathname,
      query,
    }, asPath, { locale });
  }, [
    asPath,
    pathname,
    query,
    router,
  ]);

  if (!locales) {
    return null;
  }

  return (
    <MenuList>
      {locales.map(locale => (
        <MenuItem key={locale}>
          <MenuLink
            onClick={handleIntlChange(locale)}
          >
            <FormattedDisplayName
              type="language"
              value={locale}
            />
          </MenuLink>
        </MenuItem>
      ))}
    </MenuList>
  );
};
