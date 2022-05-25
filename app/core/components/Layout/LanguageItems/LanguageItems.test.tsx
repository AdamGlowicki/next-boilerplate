import mockRouter from 'mocks/next-router';
import { render } from 'tests/utils';
import {
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/dom';

import { LanguageItems } from './LanguageItems';

jest.mock('next/dist/client/router', () => mockRouter);

const Component = () => (
  <LanguageItems />
);

const renderedComponent = () => render(<Component />);

describe('LanguageItems component', () => {
  beforeEach(() => {
    mockRouter.locales = [
      'en',
      'pl',
    ];
  });
  it('render null when don\'t have any locales', () => {
    mockRouter.locales = [];

    renderedComponent();

    expect(screen.queryByText('English')).not.toBeInTheDocument();
  });
  it('render locale items when provided', () => {
    renderedComponent();

    expect(screen.queryByText('English')).toBeInTheDocument();
    expect(screen.queryByText('Polish')).toBeInTheDocument();
  });
  it('page locale is changing after click on item', async () => {
    renderedComponent();

    expect(mockRouter.locale).toBeUndefined();

    await waitFor(() => {
      fireEvent.click(screen.getByText('English'));
    });

    expect(mockRouter.locale).toBe('en');

    await waitFor(() => {
      fireEvent.click(screen.getByText('Polish'));
    });

    expect(mockRouter.locale).toBe('pl');
  });
});
