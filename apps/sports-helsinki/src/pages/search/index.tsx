import type { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { useRef, useEffect } from 'react';
import { Page as HCRCApolloPage } from 'react-helsinki-headless-cms/apollo';
import SearchPage from 'domain/search/venueSearch/SearchPage';
import SimpleVenueSearch from 'domain/search/venueSearch/VenueSearch';
import Navigation from '../../common-events/components/navigation/Navigation';
import { ROUTES } from '../../constants';
import getSportsStaticProps from '../../domain/app/getSportsStaticProps';
import FooterSection from '../../domain/footer/Footer';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';
import MatomoWrapper from '../../domain/matomoWrapper/MatomoWrapper';
import { getLocaleOrError } from '../../utils/routerUtils';

export default function Search() {
  const router = useRouter();
  const scrollTo = router.query?.scrollTo;
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const listElement = listRef.current;

    if (scrollTo) {
      const listItemElement = listElement?.querySelector(
        decodeURIComponent(scrollTo.toString())
      );

      if (listItemElement) {
        listItemElement.scrollIntoView({
          block: 'center',
        });
      }
    }
  }, [scrollTo]);

  return (
    <MatomoWrapper>
      <HCRCApolloPage
        uri={ROUTES.SEARCH}
        className="pageLayout"
        navigation={<Navigation />}
        content={
          <SearchPage
            SearchComponent={SimpleVenueSearch}
            pageTitle={'eventSearch.title'}
          />
        }
        footer={<FooterSection />}
      />
    </MatomoWrapper>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getSportsStaticProps(context, async () => {
    const locale = getLocaleOrError(context.locale);
    return {
      props: {
        ...(await serverSideTranslationsWithCommon(locale, [
          'common',
          'home',
          'event',
          'search',
        ])),
      },
    };
  });
}
