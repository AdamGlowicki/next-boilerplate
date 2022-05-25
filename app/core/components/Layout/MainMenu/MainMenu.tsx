import React from 'react';
import Link from 'next/link';

import { routePaths } from '@/core/constants/routes';

import { LanguageItems } from '../LanguageItems';
import {
  MenuItem,
  MenuLink,
  MenuList,
  MenuNav,
} from './MainMenu.styles';

export const MainMenu = () => (
  <MenuNav>
    <MenuList>
      <MenuItem>
        <Link
          href="/"
          passHref
        >
          <MenuLink>Home</MenuLink>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link
          href={routePaths.subpage}
          passHref
        >
          <MenuLink>Subpage</MenuLink>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link
          href={routePaths.error}
          passHref
        >
          <MenuLink>404</MenuLink>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link
          href={routePaths.server}
          passHref
        >
          <MenuLink>Server</MenuLink>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link
          href={routePaths.protected}
          passHref
        >
          <MenuLink>Protected</MenuLink>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link
          href={routePaths.static}
          passHref
        >
          <MenuLink>Static</MenuLink>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link
          href="/translations"
          passHref
        >
          <MenuLink>Translations</MenuLink>
        </Link>
      </MenuItem>
    </MenuList>
    <LanguageItems />
  </MenuNav>
);
