import mockRouter from 'mocks/next-router';
import { render } from 'tests/utils';
import { screen } from '@testing-library/dom';

import { useLocaleRedirect } from '@/core/hooks/useLocaleRedirect';

jest.mock('next/dist/client/router', () => mockRouter);

const Component = ({
  locale,
}: { locale: string }) => {
  useLocaleRedirect(locale);

  return (
    <div>
      <p>Example component</p>
      <span>
        {locale}
      </span>
    </div>
  );
};

const renderedComponent = (locale: string) => render(<Component locale={locale} />);

describe('useLocaslRedirects hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRouter.locales = [
      'en',
      'pl',
      'de',
    ];
    mockRouter.locale = 'en';
    mockRouter.setCurrentUrl('/initial');
  });
  it('change locale if default value is different', () => {
    expect(mockRouter).toMatchObject({
      locale: 'en',
    });

    renderedComponent('pl');

    expect(mockRouter).toMatchObject({
      locale: 'pl',
    });
  });
  it('runs only once despite locale prop change', () => {
    const { rerender } = renderedComponent('pl');

    expect(mockRouter).toMatchObject({
      locale: 'pl',
    });

    rerender(<Component locale="de" />);

    expect(mockRouter).toMatchObject({
      locale: 'pl',
    });
    expect(screen.getByText('de')).toBeInTheDocument();
  });
});
