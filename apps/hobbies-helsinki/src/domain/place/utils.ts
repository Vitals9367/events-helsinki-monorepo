import { useEventsApolloClient } from '../clients/eventsApolloClient';
import type {
  Maybe,
  PlaceDetailsQuery,
} from '../nextApi/graphql/generated/graphql';
import { PlaceDetailsDocument } from '../nextApi/graphql/generated/graphql';

export const getPlaceDetailsFromCache = (
  id: string
): Maybe<PlaceDetailsQuery> => {
  const eventsApolloClient = useEventsApolloClient();
  return eventsApolloClient.readQuery<PlaceDetailsQuery>({
    query: PlaceDetailsDocument,
    variables: { id },
  });
};
