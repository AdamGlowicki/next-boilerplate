import { render } from '@testing-library/react';
import Cookies from 'js-cookie';
import mockRouter from 'mocks/next-router';
import { waitFor } from '@testing-library/dom';

import { Translation } from './Translation';

Cookies.set = jest.fn();
jest.mock('next/dist/client/router', () => mockRouter);

const Component = () => (
  <Translation serverMessages={{}}>
    <p>
      Translation test
    </p>
  </Translation>
);

const renderedComponent = () => render(<Component />);

describe('Translation component', () => {
  it('set cookie when locale changes', async () => {
    mockRouter.locale = 'en';
    mockRouter.defaultLocale = 'en';
    renderedComponent();

    expect(Cookies.set).toBeCalledTimes(1);

    await waitFor(() => {
      mockRouter.push(
        '/testing',
        undefined,
        { locale: 'pl' }
      );
    });

    expect(Cookies.set).toBeCalledTimes(2);
  });
});
