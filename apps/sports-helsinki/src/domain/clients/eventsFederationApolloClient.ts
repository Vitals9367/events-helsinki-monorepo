import https from 'https';
import type {
  FieldMergeFunction,
  HttpOptions,
  NormalizedCacheObject,
  StoreObject,
} from '@apollo/client';
import {
  defaultDataIdFromObject,
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { relayStylePagination } from '@apollo/client/utilities';
import * as Sentry from '@sentry/browser';
import fetch from 'cross-fetch';
import type { LanguageString } from 'events-helsinki-components';
import {
  excludeArgs,
  initializeApolloClient,
  isClient,
  MutableReference,
  sortMenuItems,
} from 'events-helsinki-components';
import capitalize from 'lodash/capitalize';
import { useMemo } from 'react';
import { logger } from '../../logger';
import { rewriteInternalURLs } from '../../utils/routerUtils';
import AppConfig from '../app/AppConfig';

const eventsFederationApolloClient = new MutableReference<
  ApolloClient<NormalizedCacheObject>
>();

function getHttpLink(uri: string) {
  let options: HttpOptions = {
    uri,
    fetch,
  };

  // Our review environment can't provide a valid certificate. Hence we allow
  // the application to be configured so that unauthorized requests are not
  // rejected. This allows us to test API changes in the review environment.
  if (
    AppConfig.allowUnauthorizedRequests &&
    new URL(uri).protocol === 'https:'
  ) {
    logger.info('Allowing unauthorized requests');
    options = {
      ...options,
      fetchOptions: {
        agent: new https.Agent({ rejectUnauthorized: false }),
      },
    };
  }

  return new HttpLink(options);
}

const getPageStylePaginator = (merge: FieldMergeFunction) => ({
  // Only ignore page argument in caching to get fetchMore pagination working correctly
  // Other args are needed to separate different serch queries to separate caches
  // Docs: https://www.apollographql.com/docs/react/pagination/key-args/
  keyArgs: excludeArgs(['page']),
  merge,
});

export function createApolloClient() {
  // Rewrite the URLs coming from events API to route them internally.
  const transformInternalURLs = new ApolloLink((operation, forward) => {
    return forward(operation).map((response) => {
      response.data = response.data
        ? rewriteInternalURLs(response.data)
        : response.data;
      return response;
    });
  });
  const httpLink = getHttpLink(AppConfig.federationGraphqlEndpoint);
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        const errorMessage = `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`;
        Sentry.captureMessage(errorMessage);
      });
    }
    if (networkError) {
      Sentry.captureMessage('Network error');
    }
  });

  const cache = createApolloCache();

  return new ApolloClient({
    connectToDevTools: true,
    ssrMode: !isClient, // Disables forceFetch on the server (so queries are only run once)
    // TODO: Add error link after adding Sentry to the project
    link: ApolloLink.from([transformInternalURLs, errorLink, httpLink]),
    cache,
  });
}

export function createApolloCache() {
  return new InMemoryCache({
    typePolicies: {
      MenuItems: {
        fields: {
          nodes: {
            read(nodes) {
              return sortMenuItems(nodes);
            },
          },
        },
      },
      Query: {
        queryType: true, // This type represents the Root Query.
        fields: {
          event(_, { args, toReference }) {
            return toReference({
              __typename: 'EventDetails',
              id: args?.id,
            });
          },
          image(_, { args, toReference }) {
            return toReference({
              __typename: 'Place',
              id: args?.id,
            });
          },
          keyword(_, { args, toReference }) {
            return toReference({
              __typename: 'Keyword',
              id: args?.id,
            });
          },
          place(_, { args, toReference }) {
            return toReference({
              __typename: 'Place',
              id: args?.id,
            });
          },
          eventList: getPageStylePaginator((existing, incoming) => {
            if (!incoming) return existing;
            return {
              data: [...(existing?.data ?? []), ...incoming.data],
              meta: incoming.meta,
            };
          }),
          // See eventList keyArgs for explanation why page is filtered.
          eventsByIds: getPageStylePaginator((existing, incoming) => {
            if (!incoming) return existing;
            return {
              data: [...(existing?.data ?? []), ...incoming.data],
              meta: incoming.meta,
            };
          }),
          unifiedSearch: relayStylePagination(excludeArgs(['after'])),
        },
      },
      Keyword: {
        keyFields: (object: Readonly<StoreObject>, { selectionSet }) => {
          // Hacky way to not store keywords without id to cache (then name is missing also)
          // This happends when queries are done without include: ['keywords']
          if (selectionSet) {
            return object.id ? `Keyword:${object.internalId}` : false;
          }

          // if selectionSet is not defined, it means that toReference function calls keyfields
          // then we want to return cache id normally.
          return defaultDataIdFromObject(object);
        },
      },
      OntologyWord: {
        fields: {
          label: {
            read(label: LanguageString) {
              const { fi, en, sv } = label;
              return {
                ...label,
                fi: fi ? capitalize(fi) : '',
                en: en ? capitalize(en) : '',
                sv: sv ? capitalize(sv) : '',
              };
            },
          },
        },
      },
    },
  });
}

export default function initializeFederationApolloClient(
  initialState: NormalizedCacheObject = {}
): ApolloClient<NormalizedCacheObject> {
  return initializeApolloClient<
    NormalizedCacheObject,
    ApolloClient<NormalizedCacheObject>
  >({
    initialState,
    mutableCachedClient: eventsFederationApolloClient,
    createClient: createApolloClient,
  });
}

export function useApolloClient(
  initialState: NormalizedCacheObject = {}
): ApolloClient<NormalizedCacheObject> {
  return useMemo(
    () => initializeFederationApolloClient(initialState),
    [initialState]
  );
}

export const apolloClient = createApolloClient();
