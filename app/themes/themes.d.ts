import { ThemeDirection } from '@/core/constants/constants';
import { theme } from '@/themes/main';

export type Theme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    direction: ThemeDirection;
  }
}
