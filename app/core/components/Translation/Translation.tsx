import {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import {
  IntlProvider,
  MessageFormatElement,
} from 'react-intl';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

import { importLocaleMessages } from '@/utils/helpers';

export const TranslationContext = createContext({
  locale: false,
});

type MessagesObj = {
  [key: string]: Array<MessageFormatElement>;
} | undefined;

type TranslationProps = {
  children: ReactNode;
  serverMessages: MessagesObj;
}

export const Translation = ({
  children,
  serverMessages,
}: TranslationProps) => {
  const [
    messages,
    setMessages,
  ] = useState<MessagesObj>();

  const {
    locale,
    defaultLocale,
  } = useRouter();

  useEffect(() => {
    if (locale) {
      Cookies.set('NEXT_LOCALE', locale);
    }

    if (!serverMessages) {
      (async () => {
        setMessages(await importLocaleMessages(locale));
      })();
    }
  }, [
    locale,
    serverMessages,
  ]);

  if (!serverMessages && !messages) {
    return null;
  }

  if (!locale) {
    return (
      <>
        {children}
      </>
    );
  }

  return (
    <IntlProvider
      messages={serverMessages || messages}
      locale={locale}
      defaultLocale={defaultLocale}
    >
      {children}
    </IntlProvider>
  );
};
