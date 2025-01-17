/* eslint-disable no-console */
import type { MockedResponse } from '@apollo/client/testing';
import type { Meta } from 'events-helsinki-components';
import {
  NeighborhoodListDocument,
  PlaceListDocument,
} from 'events-helsinki-components';
import { advanceTo, clear } from 'jest-date-mock';
import * as React from 'react';
import { toast } from 'react-toastify';

import { render, userEvent, waitFor, screen } from '@/test-utils';
import { translations } from '@/test-utils/initI18n';
import {
  fakeEvents,
  fakeLocalizedObject,
  fakeNeighborhoods,
  fakePlaces,
} from '@/test-utils/mockDataUtils';
import {
  createEventListRequestAndResultMocks,
  createEventListRequestThrowsErrorMocks,
} from '@/test-utils/mocks/eventListMocks';
import EventSearchPageContainer from '../EventSearchPageContainer';

const meta: Meta = {
  count: 20,
  next:
    // eslint-disable-next-line max-len
    'https://api.hel.fi/linkedevents/v1/event/?division=kunta%3Ahelsinki&include=keywords%2Clocation&language=fi&page=2&page_size=10&sort=start_time&start=2020-08-12T17&super_event_type=umbrella%2Cnone&text=jazz',
  previous: null,
  __typename: 'Meta',
};
const meta2: Meta = {
  count: 1,
  next: null,
  previous: null,
  __typename: 'Meta',
};

const testEventName = 'Testituloskortti 1';

const eventsResponse = { ...fakeEvents(10), meta };

const eventsLoadMoreResponse = {
  ...fakeEvents(10),
  meta: { ...meta, next: null },
};

const neighborhoodsResponse = {
  data: {
    neighborhoodList: fakeNeighborhoods(10),
  },
};

const placesResponse = {
  data: {
    placeList: fakePlaces(10),
  },
};

const searchJazzMocks = [
  createEventListRequestAndResultMocks({
    variables: { allOngoingAnd: ['jazz'] },
    response: eventsResponse,
  }),
  createEventListRequestAndResultMocks({
    variables: { allOngoingAnd: ['jazz'] },
    response: {
      ...fakeEvents(1, [{ name: fakeLocalizedObject(testEventName) }]),
      meta: meta2,
    },
  }),
  {
    request: {
      query: NeighborhoodListDocument,
    },
    result: neighborhoodsResponse,
  },
  {
    request: {
      query: PlaceListDocument,
      variables: {
        hasUpcomingEvents: true,
        pageSize: 10,
        text: '',
      },
    },
    result: placesResponse,
  },
];

const searchJazzThenClickLoadMoreMocks = [
  ...searchJazzMocks,
  createEventListRequestAndResultMocks({
    variables: { allOngoingAnd: ['jazz'], page: 2 },
    response: eventsLoadMoreResponse,
  }),
];
const searchJazzThenClickLoadMoreThrowsErrorMock = [
  ...searchJazzMocks,
  createEventListRequestThrowsErrorMocks(),
];

afterEach(() => {
  jest.restoreAllMocks();
});

afterAll(() => {
  clear();
});

const pathname = '/haku';
const search = '?text=jazz';
const testRoute = `${pathname}${search}`;
const routes = [testRoute];

const renderComponent = (
  mocks: MockedResponse[] = searchJazzThenClickLoadMoreMocks
) =>
  render(<EventSearchPageContainer />, {
    mocks,
    routes,
  });

it('all the event cards should be visible and load more button should load more events', async () => {
  advanceTo(new Date(2020, 7, 12));
  renderComponent();

  await waitFor(() => {
    expect(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      screen.getByText(eventsResponse.data[0].name.fi!)
    ).toBeInTheDocument();
  });

  eventsResponse.data.forEach((event) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(screen.getByText(event.name.fi!)).toBeInTheDocument();
  });

  await userEvent.click(
    screen.getByRole('button', {
      name: translations.search.buttonLoadMore.replace(
        '{{count}}',
        (eventsResponse.meta.count - eventsResponse.data.length).toString()
      ),
    })
  );

  // FIXME: Test load more
  // eventsLoadMoreResponse.data.forEach(async (event) => {
  //   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //   expect(await screen.findByText(event.name.fi!)).toBeInTheDocument();
  // });
}, 10000);

it('should show toastr message when loading next event page fails', async () => {
  toast.error = jest.fn();

  renderComponent(searchJazzThenClickLoadMoreThrowsErrorMock);

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });
  const name = translations.search.buttonLoadMore.replace(
    '{{count}}',
    (eventsResponse.meta.count - eventsResponse.data.length).toString()
  );

  await waitFor(() => {
    expect(
      screen.getByRole('button', {
        name,
      })
    ).toBeInTheDocument();
  });

  await userEvent.click(
    screen.getByRole('button', {
      name,
    })
  );

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  expect(toast.error).toHaveBeenCalledWith(translations.search.errorLoadMode);
});

it.todo('should scroll to event defined in react-router location state');
// it('should scroll to event defined in react-router location state', async () => {
//   scroller.scrollTo = jest.fn();
//   const mockLocation = {
//     pathname,
//     hash: '',
//     search,
//     state: { eventId: eventsResponse.data[0].id },
//   };
//   jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);

//   renderComponent();

//   await waitFor(() => {
//     expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
//   });

//   expect(scroller.scrollTo).toBeCalled();
// });

it.todo('should not scroll to result list on large screen');
// it('should not scroll to result list on large screen', async () => {
//   scroller.scrollTo = jest.fn();
//   const mockLocation = {
//     pathname,
//     hash: '',
//     search,
//     state: { scrollToResults: true },
//   };
//   jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);

//   renderComponent();

//   await waitFor(() => {
//     expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
//   });

//   expect(scroller.scrollTo).not.toBeCalled();
// });

it.todo('should scroll to result list on mobile screen');
// it('should scroll to result list on mobile screen', async () => {
//   global.innerWidth = 500;
//   scroller.scrollTo = jest.fn();

//   const mockLocation = {
//     pathname,
//     hash: '',
//     search,
//     state: { scrollToResults: true },
//   };
//   jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);

//   renderComponent();

//   await waitFor(() => {
//     expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
//   });

//   expect(scroller.scrollTo).toBeCalled();
// });
