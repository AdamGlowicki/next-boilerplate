import mockRouter from 'mocks/next-router';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import styled, { ThemeProvider } from 'styled-components';

import { useTheme } from '@/core/hooks/useTheme';

jest.mock('@/themes/main', () => ({
  get theme() {
    return { backgroundColor: '#fff' };
  },
}));
jest.mock('next/dist/client/router', () => mockRouter);

const Component = () => {
  const theme = useTheme();

  return (
    <ThemeProvider theme={{ ...theme }}>
      <span>
        {theme.backgroundColor}
      </span>
      <p>
        {theme.direction}
      </p>
    </ThemeProvider>
  );
};

const StyledSpan = styled.span`
  background-color: ${({ theme: { backgroundColor } }) => backgroundColor};
`;

const StyledParagraph = styled.p`
  background-color: ${({ theme: { backgroundColor } }) => backgroundColor};
`;

const CustomValuesTheme = () => {
  const theme = useTheme();
  const customTheme = useTheme({
    backgroundColor: '#000',
  });

  return (
    <ThemeProvider theme={{ ...theme }}>
      <StyledSpan
        theme={customTheme}
        data-testid="black"
      >
        {customTheme.backgroundColor}
      </StyledSpan>
      <StyledParagraph data-testid="white">
        {theme.backgroundColor}
      </StyledParagraph>
    </ThemeProvider>
  );
};

const renderComponent = () => render(<Component />);
const renderCustomValuesTheme = () => render(<CustomValuesTheme />);

describe('useTheme hook', () => {
  it('sets the theme properly', () => {
    renderComponent();

    expect(screen.getByText('#fff')).toBeInTheDocument();
    expect(screen.getByText('ltr')).toBeInTheDocument();
  });
  it('sets the direction to rtl or lts despite of locale', () => {
    mockRouter.locale = 'ar';

    renderComponent();

    expect(screen.getByText('rtl')).toBeInTheDocument();
  });
  it('don\'t overwrite the original theme value, only change local value', () => {
    renderCustomValuesTheme();

    expect(screen.getByTestId('black')).toHaveTextContent('#000');
    expect(screen.getByTestId('black')).toHaveStyle({
      backgroundColor: '#000',
    });
    expect(screen.getByTestId('white')).toHaveTextContent('#fff');
    expect(screen.getByTestId('white')).toHaveStyle({
      backgroundColor: '#fff',
    });
  });
});
