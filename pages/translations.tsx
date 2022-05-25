import { GetServerSideProps } from 'next';

import { wrapper } from '@/core/store/store';

import { Intl } from '@/features/Intl';

import { importLocaleMessages } from '@/utils/helpers';

const Translations = () => (
  <Intl />
);

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  () => async context => ({
    props: {
      // messages prop is only used in _app.tsx to provide translations in SSR
      messages: await importLocaleMessages(context.locale),
    },
  })
);

export default Translations;
