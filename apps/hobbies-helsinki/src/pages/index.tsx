import {
  useLocale,
  DEFAULT_LANGUAGE,
  getQlLanguage,
} from 'events-helsinki-components';
import type { GetStaticPropsContext, NextPage } from 'next';
import React from 'react';
import type { PageType, ArticleType } from 'react-helsinki-headless-cms';
import {
  useConfig,
  PageContent as HCRCPageContent,
  Page as HCRCPage,
  TemplateEnum,
} from 'react-helsinki-headless-cms';
import type {
  PageByTemplateQuery,
  PageByTemplateQueryVariables,
  LandingPageQuery,
  LandingPageQueryVariables,
} from 'react-helsinki-headless-cms/apollo';
import {
  PageByTemplateDocument,
  LandingPageDocument,
} from 'react-helsinki-headless-cms/apollo';

import Navigation from '../common-events/components/navigation/Navigation';
import { getDefaultCollections } from '../common-events/utils/headless-cms/headlessCmsUtils';
import getHobbiesStaticProps from '../domain/app/getHobbiesStaticProps';
import FooterSection from '../domain/footer/Footer';
import serverSideTranslationsWithCommon from '../domain/i18n/serverSideTranslationsWithCommon';
import MatomoWrapper from '../domain/matomoWrapper/MatomoWrapper';
import { LandingPageContentLayout } from '../domain/search/landingPage/LandingPage';
import { getLocaleOrError } from '../utils/routerUtils';

const HomePage: NextPage<{
  landingPage: LandingPageQuery['landingPage'];
  page: PageType;
}> = ({ landingPage, page }) => {
  const locale = useLocale();
  const {
    currentLanguageCode,
    utils: { getRoutedInternalHref },
  } = useConfig();

  return (
    <MatomoWrapper>
      <HCRCPage
        className="pageLayout"
        navigation={<Navigation />}
        content={
          <HCRCPageContent
            page={page}
            landingPage={landingPage}
            PageContentLayoutComponent={LandingPageContentLayout}
            collections={(page: PageType | ArticleType) =>
              getDefaultCollections(
                page,
                getRoutedInternalHref,
                currentLanguageCode
              )
            }
            language={getQlLanguage(locale)}
          />
        }
        footer={<FooterSection />}
      />
    </MatomoWrapper>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  return getHobbiesStaticProps(context, async ({ cmsClient }) => {
    try {
      const locale = getLocaleOrError(context.locale);
      const { data: landingPageData } = await cmsClient.query<
        LandingPageQuery,
        LandingPageQueryVariables
      >({
        query: LandingPageDocument,
        variables: {
          id: 'root',
          languageCode: getQlLanguage(locale),
        },
      });

      const { data: pageData } = await cmsClient.query<
        PageByTemplateQuery,
        PageByTemplateQueryVariables
      >({
        query: PageByTemplateDocument,
        variables: {
          template: TemplateEnum.FrontPage,
          language: getQlLanguage(locale).toLocaleLowerCase(),
        },
      });

      const page = pageData.pageByTemplate;

      const landingPage = landingPageData.landingPage;

      return {
        props: {
          ...(await serverSideTranslationsWithCommon(locale, [
            'home',
            'search',
            'event',
          ])),
          landingPage: landingPage,
          page: page,
        },
      };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(
        'An error occured in the getStaticProps of the Next-js Index-page!',
        'Tried to fetch the front page and the landing page from the Headless CMS, but an error occured!!',
        e
      );
      return {
        props: {
          ...(await serverSideTranslationsWithCommon(
            getLocaleOrError(DEFAULT_LANGUAGE),
            ['home', 'search']
          )),
          landingPage: null,
          page: null,
        },
      };
    }
  });
}

export default HomePage;
