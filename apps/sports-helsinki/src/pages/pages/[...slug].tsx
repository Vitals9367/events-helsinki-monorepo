/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import type { NormalizedCacheObject } from '@apollo/client';
import type { AppLanguage } from 'events-helsinki-components';
import type {
  GetStaticPropsContext,
  GetStaticPropsResult,
  NextPage,
} from 'next';
import type {
  Breadcrumb,
  CollectionType,
  PageContentProps,
  PageType,
} from 'react-helsinki-headless-cms';
import {
  getCollections,
  PageContent as HCRCPageContent,
  Page as HCRCPage,
  useConfig,
} from 'react-helsinki-headless-cms';
import type {
  PageQuery,
  PageQueryVariables,
} from 'react-helsinki-headless-cms/apollo';
import { PageDocument } from 'react-helsinki-headless-cms/apollo';
import { createApolloClient } from 'domain/clients/eventsFederationApolloClient';
import Navigation from '../../common-events/components/navigation/Navigation';
import {
  getDefaultCollections,
  getSlugFromUri,
  getUriID,
} from '../../common-events/utils/headless-cms/headlessCmsUtils';
import { getAllPages } from '../../common-events/utils/headless-cms/service';
import AppConfig from '../../domain/app/AppConfig';
import FooterSection from '../../domain/footer/Footer';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';
import MatomoWrapper from '../../domain/matomoWrapper/MatomoWrapper';
import { getLocaleOrError } from '../../utils/routerUtils';

const NextCmsPage: NextPage<{
  page: PageType;
  breadcrumbs: Breadcrumb[] | null;
  collections: CollectionType[];
}> = ({ page, breadcrumbs, collections }) => {
  const {
    currentLanguageCode,
    utils: { getRoutedInternalHref },
  } = useConfig();

  return (
    <MatomoWrapper>
      <HCRCPage
        navigation={<Navigation page={page} />}
        content={
          <HCRCPageContent
            page={page as PageContentProps['page']}
            breadcrumbs={breadcrumbs ?? undefined}
            collections={
              collections
                ? getDefaultCollections(
                    page,
                    getRoutedInternalHref,
                    currentLanguageCode
                  )
                : []
            }
          />
        }
        footer={<FooterSection />}
      />
    </MatomoWrapper>
  );
};

export async function getStaticPaths() {
  const pagePageInfos = await getAllPages();
  const paths = pagePageInfos
    .map((pageInfo) => ({
      params: { slug: getSlugFromUri(pageInfo.slug) },
      locale: pageInfo.locale,
    }))
    // Remove the pages without a slug
    .filter((entry) => entry.params.slug && entry.params.slug.length);
  return {
    paths,
    fallback: true, // can also be true or 'blocking'
  };
}

type ResultProps =
  | {
      initialApolloState: NormalizedCacheObject;
      page: PageQuery['page'];
      breadcrumbs: Breadcrumb[];
      collections: CollectionType[];
    }
  | {
      error?: {
        statusCode: number;
      };
    };

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<ResultProps>> {
  try {
    const {
      currentPage: page,
      breadcrumbs,
      apolloClient,
    } = await getProps(context);
    if (!page) {
      return {
        notFound: true,
        revalidate: true,
      };
    }
    const locale = getLocaleOrError(context.locale);

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
        ...(await serverSideTranslationsWithCommon(locale, ['cms'])),
        page,
        breadcrumbs,
        collections: getCollections(page.modules ?? []),
      },
      revalidate: 60,
    };
  } catch (e) {
    return {
      props: {
        error: {
          statusCode: 400,
        },
      },
      revalidate: 10,
    };
  }
}

const getProps = async (context: GetStaticPropsContext) => {
  const apolloClient = createApolloClient();
  const { data: pageData } = await apolloClient.query<
    PageQuery,
    PageQueryVariables
  >({
    query: PageDocument,
    variables: {
      id: _getURIQueryParameter(
        context.params?.slug as string[],
        context.locale as AppLanguage
      ),
      // `idType: PageIdType.Uri // idType is`fixed in query, so added automatically
    },
  });

  const currentPage = pageData.page;
  // TODO: Breadcrumbs are unstyled, so left disabled
  // const breadcrumbs = _getBreadcrumbs(
  //   apolloClient,
  //   (context.params?.slug ?? []) as string[]
  // );

  return { currentPage, breadcrumbs: [], apolloClient };
};

/**
 * The Headless CMS URIs needs to have a contextpath as a part of the URI.
 * While the headless cms does not support prefixin the route,
 * a workaround is to add all the dynamic pages as subpages for a page with a slug "pages".
 * To embed this context path to the routes of Nextjs API without duplicating a path of an URI,
 * the pages context path needs to be added to the query.
 * @param slugs   a category URI splitted in slugs
 * @param locale  locale of the
 * @returns
 */
function _getURIQueryParameter(slugs: string[], locale: AppLanguage) {
  const uri = getUriID(slugs, locale);
  if (uri.startsWith(AppConfig.cmsPagesContextPath)) {
    return uri;
  }
  // TODO: get rid of this context path prefix if headless cms supports it
  // The workaround for Headless CMS makes all the dynamic cms pages
  // to be subpages for a page with slug 'pages'
  return `${AppConfig.cmsPagesContextPath}${uri}`;
}

// async function _getBreadcrumbs(
//   cmsClient: ApolloClient<NormalizedCacheObject>,
//   slugs: string[]
// ) {
//   // Fetch all parent pages for navigation data.
//   // These breadcrumb uris are used to fetch all the parent pages of the current page
//   // so that all the childrens of parent page can be figured out and sub page navigations can be formed
//   // for rendering
//   const uriSegments = slugsToUriSegments(slugs);
//   const apolloPageResponses = await Promise.all(
//     uriSegments.map((uri) => {
//       return cmsClient.query<PageQuery, PageQueryVariables>({
//         query: PageDocument,
//         variables: {
//           id: uri,
//         },
//       });
//     })
//   );
//   const pages = apolloPageResponses.map((res) => res.data.page);
//   const breadcrumbs = pages.map((page) => ({
//     link: page?.link ?? '',
//     title: page?.title ?? '',
//   }));
//   return breadcrumbs;
// }

export default NextCmsPage;
