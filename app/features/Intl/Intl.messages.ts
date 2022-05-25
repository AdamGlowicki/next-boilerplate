import { defineMessages } from 'react-intl';

export default defineMessages({
  dateTitle: {
    defaultMessage: 'Date',
    description: 'title of date section',
    // id is optional and should be avoided:
    // https://formatjs.io/docs/getting-started/message-extraction#automatic-id-generation
    id: 'app.intl.titles.date',
  },
  description: {
    defaultMessage: 'All other components and functions you can find here: {link}.',
    description: 'description of translation page',
  },
  numberTitle: {
    defaultMessage: 'Number',
    description: 'title of number section',
  },
  pluralMessage: {
    defaultMessage: `You have {itemCount, plural, 
      =0 {no items} 
      one {1 item} 
      two {{itemCount} items}
      few {{itemCount} items}
      many {{itemCount} items}
      other {{itemCount} items}
    }.`,
  },
  pluralTitle: {
    defaultMessage: 'Plural',
    description: 'title of plural section',
  },
  timeTitle: {
    defaultMessage: 'Time',
    description: 'title of time section',
  },
  title: {
    defaultMessage: 'This is example page of {library} features',
    description: 'title of translation page',
  },
});
