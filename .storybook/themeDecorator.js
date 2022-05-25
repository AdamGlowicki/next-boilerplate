import { ThemeProvider } from "styled-components";

import { theme } from '../app/themes/main';

const ThemeDecorator = (Story) => (
  <ThemeProvider theme={theme}>
    <Story />
  </ThemeProvider>
);

export default ThemeDecorator;
