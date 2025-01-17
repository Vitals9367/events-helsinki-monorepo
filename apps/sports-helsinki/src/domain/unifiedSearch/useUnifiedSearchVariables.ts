import type {
  SearchListQueryVariables,
  UnifiedSearchLanguage,
} from 'events-helsinki-components';
import { useLocale, useUnifiedSearch } from 'events-helsinki-components';
import type {
  OrderByType,
  OrderDirType,
} from 'events-helsinki-components/components/domain/unifiedSearch/unifiedSearchConstants';
import {
  OrderBy,
  OrderDir,
  orderDirToUnifiedSearchDistanceOrder,
} from 'events-helsinki-components/components/domain/unifiedSearch/unifiedSearchConstants';
import {
  HELSINKI_OCD_DIVISION_ID,
  SPORTS_DEPARTMENT_ONTOLOGY_TREE_ID,
} from '../app/appConstants';

export type Coordinates = {
  latitude: number;
  longitude: number;
};

function getOpenAt(openAt: Date, isOpenNow: boolean): string | null {
  if (openAt) {
    return openAt.toJSON();
  }

  if (isOpenNow) {
    return 'now';
  }

  return null;
}

type OrderByOptions = {
  position: Coordinates | undefined;
};

function getOrderBy(
  orderBy: OrderByType,
  orderDir: OrderDirType,
  options?: OrderByOptions
) {
  const usOrderDir = orderDirToUnifiedSearchDistanceOrder[orderDir];

  if (orderBy === OrderBy.distance && options?.position) {
    return {
      orderByDistance: {
        latitude: options?.position.latitude,
        longitude: options?.position.longitude,
        order: usOrderDir,
      },
    };
  }

  if (orderBy === OrderBy.name) {
    return {
      orderByName: {
        order: usOrderDir,
      },
    };
  }

  // With no ordering, Unified Search will return the default sort order of
  // ElasticSearch, which is by relevance.
  return {};
}

const appToUnifiedSearchLanguageMap = {
  fi: 'FINNISH',
  sv: 'SWEDISH',
  en: 'ENGLISH',
};

const defaultPagination = {
  after: '',
  first: 10,
};

export type OverridableVariables = {
  first: number;
};

export default function useUnifiedSearchVariables(
  variables?: OverridableVariables
): SearchListQueryVariables {
  const {
    filters: {
      q,
      // By default filter by the sports dept. ontology tree id
      ontologyTreeIds = [SPORTS_DEPARTMENT_ONTOLOGY_TREE_ID],
      // Limit results inside Helsinki when there is no administrative division(s) selected
      administrativeDivisionIds = [HELSINKI_OCD_DIVISION_ID],
      isOpenNow,
      openAt,
      orderBy = OrderBy.name,
      orderDir = OrderDir.asc,
      ontologyWordIds,
      after,
      first,
    },
  } = useUnifiedSearch();

  const locale = useLocale();

  return {
    language: appToUnifiedSearchLanguageMap[locale] as UnifiedSearchLanguage,
    // Default query; everything
    q: (!q || !q.length ? ['*'] : q).join(' '),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ontologyTreeIds: ontologyTreeIds?.map((treeId: any) => treeId.toString()),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ontologyWordIds: ontologyWordIds?.map((wordId: any) => wordId.toString()),
    administrativeDivisionIds,
    openAt: openAt && isOpenNow ? getOpenAt(openAt, isOpenNow) : null,
    ...getOrderBy(orderBy, orderDir, { position: undefined }),
    after: after ?? defaultPagination.after,
    first: variables?.first ?? first ?? defaultPagination.first,
  };
}
