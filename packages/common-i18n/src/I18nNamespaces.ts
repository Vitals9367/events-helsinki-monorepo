import type appEvents from './locales/fi/appEvents.json';
import type appHobbies from './locales/fi/appHobbies.json';
import type cms from './locales/fi/cms.json';
import type common from './locales/fi/common.json';
import type consent from './locales/fi/consent.json';
import type footer from './locales/fi/footer.json';
import type home from './locales/fi/home.json';
import type notFound from './locales/fi/notFound.json';
import type search from './locales/fi/search.json';

export type I18nNamespaces = {
  appHobbies: typeof appHobbies;
  appEvents: typeof appEvents;
  cms: typeof cms;
  common: typeof common;
  consent: typeof consent;
  footer: typeof footer;
  home: typeof home;
  notFound: typeof notFound;
  search: typeof search;
};
