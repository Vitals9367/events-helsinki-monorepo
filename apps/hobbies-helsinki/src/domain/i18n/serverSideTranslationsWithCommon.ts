import type { Language } from 'events-helsinki-components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import nextI18nextConfig from '../../../next-i18next.config';

const COMMON_TRANSLATIONS = ['common', 'footer', 'notFound', 'home'];

export default async function serverSideTranslationsWithCommon(
  locale: Language,
  namespaces: string[] = []
) {
  return serverSideTranslations(
    locale,
    [...COMMON_TRANSLATIONS, ...namespaces],
    nextI18nextConfig
  );
}
