import { useRouter } from 'next/router';
import merge from 'lodash/merge';
import { DefaultTheme } from 'styled-components';

import { isLocaleRTL } from '@/utils/helpers';

import { theme } from '@/themes/main';

import { ThemeDirection } from '../constants/constants';

export const useTheme = (overwritenData?: Partial<DefaultTheme>) => {
  const { locale } = useRouter();
  const localTheme = { ...theme };

  return merge(localTheme, {
    ...overwritenData,
    direction: isLocaleRTL(locale) ? ThemeDirection.RTL : ThemeDirection.LTR,
  });
};
