import {
  FormattedDate,
  FormattedDateTimeRange,
  FormattedMessage,
  FormattedNumber,
  FormattedTime,
} from 'react-intl';

import { HeadingStyled } from './Intl.styles';
import messages from './Intl.messages';

export const Intl = () => (
  <>

    <FormattedMessage
      {...messages.title}
      tagName={HeadingStyled}
      values={{
        library: 'react-intl',
      }}
    />

    <FormattedMessage
      {...messages.description}
      tagName="p"
      values={{
        link: <a href="https://formatjs.io/docs/react-intl">https://formatjs.io/docs/react-intl</a>,
      }}
    />

    <hr />

    <section>
      <FormattedMessage
        {...messages.numberTitle}
        tagName="h2"
      />

      <p><FormattedNumber value={1000} /></p>
      <p>
        <FormattedNumber
          value={1000}
          style="currency"
          currency="USD"
        />
      </p>
    </section>

    <section>
      <FormattedMessage
        {...messages.dateTitle}
        tagName="h2"
      />
      <p><FormattedDate value={new Date(1459832991883)} /></p>
      <p>
        <FormattedDate
          value={new Date(1459832991883)}
          year="numeric"
          month="long"
          day="2-digit"
        />
      </p>
      <p>
        <FormattedDateTimeRange
          from={new Date('2020-1-1')}
          to={new Date('2020-1-15')}
        />
      </p>
      <p><FormattedTime value={new Date(1459832991883)} /></p>
    </section>

    <section>
      <FormattedMessage
        {...messages.pluralTitle}
        tagName="h2"
      />
      <FormattedMessage
        {...messages.pluralMessage}
        tagName="p"
        values={{
          itemCount: 0,
        }}
      />
      <FormattedMessage
        {...messages.pluralMessage}
        tagName="p"
        values={{
          itemCount: 1,
        }}
      />
      <FormattedMessage
        {...messages.pluralMessage}
        tagName="p"
        values={{
          itemCount: 2,
        }}
      />
      <FormattedMessage
        {...messages.pluralMessage}
        tagName="p"
        values={{
          itemCount: 10,
        }}
      />
      <FormattedMessage
        {...messages.pluralMessage}
        tagName="p"
        values={{
          itemCount: 32,
        }}
      />
    </section>
  </>
);
