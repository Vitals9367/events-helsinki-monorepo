import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import type { Connection, AppMenuItem } from '../types';
import { LanguageCodeEnum } from '../types';

export const excludeArgs =
  (excludedArgs: string[]) => (args: Record<string, unknown> | null) =>
    args
      ? Object.keys(args).filter((key: string) => !excludedArgs.includes(key))
      : false;

export function getNodes<T>(connection: Connection<T>): T[] {
  return connection.edges.map(({ node }) => node);
}

export function sortMenuItems(menuItemsConnection: { nodes: AppMenuItem[] }) {
  const menuItems = menuItemsConnection.nodes;
  const sortedMenuItems = [...menuItems].sort((a, b) => a.order - b.order);

  return {
    ...menuItemsConnection,
    nodes: sortedMenuItems,
  };
}

export function getQlLanguage(language: string): LanguageCodeEnum {
  return (
    {
      fi: LanguageCodeEnum.Fi,
      sv: LanguageCodeEnum.Sv,
      en: LanguageCodeEnum.En,
    }[language] || LanguageCodeEnum.Fi
  );
}

export function getUnifiedSearchLanguage(language: string) {
  return {
    fi: 'FINNISH',
    sv: 'SWEDISH',
    en: 'ENGLISH',
  }[language];
}

export function getMenuLocationFromLanguage(language: string) {
  switch (language) {
    case 'fi':
      return 'PRIMARY';
    case 'sv':
      return 'PRIMARY___SV';
    case 'en':
      return 'PRIMARY___EN';
    default:
      return 'PRIMARY';
  }
}

export class MutableReference<Ref = unknown> {
  _value?: Ref;

  constructor(initialReference?: Ref) {
    this._value = initialReference;
  }

  get reference(): Ref | undefined {
    return this._value;
  }

  set reference(ref: Ref | undefined) {
    this._value = ref;
  }
}

type InitApolloClientConfig<
  TCacheShape,
  Client extends ApolloClient<TCacheShape>
> = {
  initialState: TCacheShape;
  mutableCachedClient: MutableReference<Client>;
  createClient: () => Client;
};

// https://www.apollographql.com/blog/building-a-next-js-app-with-apollo-client-slash-graphql/
export function initializeApolloClient<
  TCacheShape = NormalizedCacheObject,
  Client extends ApolloClient<TCacheShape> = ApolloClient<TCacheShape>
>({
  initialState,
  mutableCachedClient,
  createClient,
}: InitApolloClientConfig<TCacheShape, Client>) {
  const _apolloClient = mutableCachedClient.reference ?? createClient();

  // Initial state hydration
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') {
    return _apolloClient;
  }

  // Create the Apollo Client once in the client
  if (!mutableCachedClient.reference) {
    mutableCachedClient.reference = _apolloClient;
  }

  return _apolloClient;
}
