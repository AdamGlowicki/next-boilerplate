import {
  createGlobalStyle,
} from 'styled-components';

import { Theme } from './themes';

export const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background: ${({ theme: { backgroundColor } }) => backgroundColor};
    direction: ${({ theme: { direction } }) => direction};
  }
`;
