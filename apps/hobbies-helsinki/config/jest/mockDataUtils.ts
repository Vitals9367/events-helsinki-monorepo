/* eslint-disable @typescript-eslint/no-explicit-any */
import { faker } from '@faker-js/faker';
import type {
  AboutPagesResponse,
  AccessibilityPagesResponse,
  Audience,
  BannerPage,
  CmsImage,
  CollectionDetails,
  CollectionListResponse,
  EventDetails,
  EventListResponse,
  ExternalLink,
  Image,
  InLanguage,
  Keyword,
  KeywordListResponse,
  LocalizedCmsImage,
  LocalizedCmsKeywords,
  LocalizedObject,
  Neighborhood,
  NeighborhoodListResponse,
  Offer,
  OrganizationDetails,
  Place,
  PlaceListResponse,
  StaticPage,
} from 'events-helsinki-components';
import { EXTLINK, EventTypeId } from 'events-helsinki-components';
import merge from 'lodash/merge';

export const fakeEvents = (
  count = 1,
  events?: Partial<EventDetails>[]
): EventListResponse => ({
  data: generateNodeArray((i) => fakeEvent(events?.[i]), count),
  meta: {
    __typename: 'Meta',
    count: count,
    next: '',
    previous: '',
  },
  __typename: 'EventListResponse',
});

export const fakeEvent = (overrides?: Partial<EventDetails>): EventDetails => {
  return merge<EventDetails, typeof overrides>(
    {
      id: `hel:${faker.datatype.uuid()}`,
      internalId: faker.datatype.uuid(),
      name: fakeLocalizedObject(),
      publisher: 'provider:123',
      provider: fakeLocalizedObject(),
      shortDescription: fakeLocalizedObject(),
      description: fakeLocalizedObject(),
      images: [fakeImage()],
      infoUrl: fakeLocalizedObject(),
      inLanguage: [fakeInLanguage()],
      audience: [],
      keywords: [fakeKeyword()],
      location: fakePlace(),
      startTime: '2020-07-13T05:51:05.761000Z',
      endTime: null,
      datePublished: null,
      externalLinks: [fakeExternalLink()],
      offers: [
        {
          infoUrl: fakeLocalizedObject(),
          isFree: false,
          description: fakeLocalizedObject(),
        },
      ],
      subEvents: [] as any,
      eventStatus: 'EventScheduled',
      superEvent: null,
      dataSource: 'hel',
      enrolmentEndTime: '',
      enrolmentStartTime: '',
      maximumAttendeeCapacity: 10,
      minimumAttendeeCapacity: 1,
      remainingAttendeeCapacity: 5,
      audienceMinAge: '5',
      audienceMaxAge: '15',
      typeId: EventTypeId.Course,
      __typename: 'EventDetails',
    },
    overrides
  );
};

export const fakeAudience = (
  count = 1,
  audience?: Partial<Audience>[]
): Audience[] => {
  return generateNodeArray((i) => fakeTargetGroup(audience?.[i]), count);
};

export const fakeTargetGroup = (overrides?: Partial<Audience>): Audience => {
  return merge<Audience, typeof overrides>(
    {
      __typename: 'Audience',
      id: faker.datatype.uuid(),
      internalContext: '',
      internalId: faker.datatype.uuid(),
      name: fakeLocalizedObject(faker.random.word()),
    },
    overrides
  );
};

export const fakeExternalLink = (
  overrides?: Partial<ExternalLink>
): ExternalLink =>
  merge(
    {
      link: faker.internet.url(),
      name: EXTLINK.EXTLINK_FACEBOOK,
      __typename: 'ExternalLink',
    },
    overrides
  );

export const fakeImage = (overrides?: Partial<Image>): Image =>
  merge(
    {
      id: faker.datatype.uuid(),
      internalId: 'https://api.hel.fi/linkedevents-test/v1/image/48566/',
      license: 'cc_by',
      name: faker.random.words(),
      url: 'https://api.hel.fi/linkedevents-test/media/images/test.png',
      cropping: '59,0,503,444',
      photographerName: faker.name.firstName(),
      __typename: 'Image',
    },
    overrides
  );

export const fakeInLanguage = (overrides?: InLanguage): InLanguage =>
  merge(
    {
      id: 'fi',
      internalId: 'https://api.hel.fi/linkedevents-test/v1/language/fi/',
      name: {
        en: null,
        fi: 'suomi',
        sv: null,
        __typename: 'LocalizedObject',
      },
      __typename: 'InLanguage',
    },
    overrides
  );

export const fakePlaces = (
  count = 1,
  places?: Partial<Place>[]
): PlaceListResponse => ({
  data: generateNodeArray((i) => fakePlace(places?.[i]), count),
  meta: {
    count: count,
    next: '',
    previous: '',
    __typename: 'Meta',
  },
  __typename: 'PlaceListResponse',
});

export const fakePlace = (overrides?: Partial<Place>): Place =>
  merge(
    {
      id: faker.datatype.uuid(),
      internalId: 'https://api.hel.fi/linkedevents-test/v1/place/tprek:15376/',
      name: fakeLocalizedObject(),
      streetAddress: fakeLocalizedObject(),
      addressLocality: fakeLocalizedObject(),
      postalCode: faker.address.zipCode(),
      hasUpcomingEvents: true,
      telephone: fakeLocalizedObject(),
      email: faker.internet.email(),
      infoUrl: fakeLocalizedObject(faker.internet.url()),
      position: null,
      divisions: [],
      __typename: 'Place',
    },
    overrides
  );

export const fakeKeywords = (
  count = 1,
  keywords?: Partial<Keyword>[]
): KeywordListResponse => ({
  data: generateNodeArray((i) => fakeKeyword(keywords?.[i]), count),
  meta: {
    __typename: 'Meta',
    count: count,
    next: '',
    previous: '',
  },
  __typename: 'KeywordListResponse',
});

export const fakeKeyword = (overrides?: Partial<Keyword>): Keyword =>
  merge(
    {
      id: faker.datatype.uuid(),
      dataSource: 'yso',
      hasUpcomingEvents: true,
      name: fakeLocalizedObject(),
      internalId: 'https://api.hel.fi/linkedevents-test/v1/keyword/yso:p4363/',
      __typename: 'Keyword',
    },
    overrides
  );

export const fakeOffer = (overrides?: Partial<Offer>): Offer =>
  merge(
    {
      description: fakeLocalizedObject(),
      infoUrl: fakeLocalizedObject(faker.internet.url()),
      isFree: false,
      price: fakeLocalizedObject(),
      __typename: 'Offer',
    },
    overrides
  );

export const fakeOrganization = (
  overrides?: Partial<OrganizationDetails>
): OrganizationDetails =>
  merge(
    {
      id: faker.datatype.uuid(),
      internalId: faker.datatype.uuid(),
      isAffiliated: false,
      name: faker.company.name(),
      __typename: 'OrganizationDetails',
    },
    overrides
  );

export const fakeNeighborhoods = (
  count = 1,
  neighborhoods?: Partial<Neighborhood>[]
): NeighborhoodListResponse => ({
  data: generateNodeArray((i) => fakeNeighborhood(neighborhoods?.[i]), count),
  meta: {
    count: count,
    next: '',
    previous: '',
    __typename: 'Meta',
  },
  __typename: 'NeighborhoodListResponse',
});

export const fakeNeighborhood = (
  overrides?: Partial<Neighborhood>
): Neighborhood =>
  merge(
    {
      id: 'kaupunginosa:aluemeri',
      name: fakeLocalizedObject(),
      __typename: 'Neighborhood',
    },
    overrides
  );

export const fakeBanner = (overrides?: Partial<BannerPage>): BannerPage =>
  merge(
    {
      buttonText: fakeLocalizedObject(),
      buttonUrl: fakeLocalizedObject(faker.internet.url()),
      description: fakeLocalizedObject(),
      heroBackgroundImage: fakeLocalizedCmsImage(),
      heroBackgroundImageColor: fakeLocalizedObject('BLACK'),
      heroBackgroundImageMobile: fakeLocalizedCmsImage(),
      heroTopLayerImage: fakeLocalizedCmsImage(),
      keywords: fakeLocalizedCmsKeywords(),
      socialMediaImage: fakeLocalizedCmsImage(),
      title: fakeLocalizedObject(),
      titleAndDescriptionColor: fakeLocalizedObject('BLACK'),
      __typename: 'BannerPage',
    },
    overrides
  );

export const fakeCollections = (
  count = 1,
  collections?: Partial<CollectionDetails>[]
): CollectionListResponse => ({
  data: generateNodeArray((i) => fakeCollection(collections?.[i]), count),
  __typename: 'CollectionListResponse',
});
export const fakeCollection = (
  overrides?: Partial<CollectionDetails>
): CollectionDetails =>
  merge(
    {
      id: faker.datatype.uuid(),
      boxColor: fakeLocalizedObject('FOG'),
      curatedEvents: [],
      curatedEventsTitle: fakeLocalizedObject(),
      description: fakeLocalizedObject(),
      eventListQuery: fakeLocalizedObject(
        'https://tapahtumat.test.kuva.hel.ninja/fi/events?isFree=true&text=jooga'
      ),
      expired: false,
      eventListTitle: fakeLocalizedObject(),
      heroImage: fakeCmsImage(),
      keywords: fakeLocalizedCmsKeywords(),
      linkText: fakeLocalizedObject(),
      linkUrl: fakeLocalizedObject(faker.internet.url()),
      live: true,
      slug: faker.datatype.uuid(),
      socialMediaDescription: fakeLocalizedObject(),
      title: fakeLocalizedObject(),
      __typename: 'CollectionDetails',
    },
    overrides
  );

export const fakeCmsImage = (overrides?: Partial<CmsImage>): CmsImage =>
  merge(
    {
      photographerCredit: fakeLocalizedObject(faker.name.lastName()),
      url: faker.internet.url(),
      __typename: 'CmsImage',
    },
    overrides
  );

export const fakeLocalizedCmsKeywords = (
  overrides?: Partial<LocalizedCmsKeywords>
): LocalizedCmsKeywords =>
  merge(
    {
      en: fakeCmsKeywords(),
      fi: fakeCmsKeywords(),
      sv: fakeCmsKeywords(),
      __typename: 'LocalizedCmsKeywords',
    },
    overrides
  );

export const fakeCmsKeywords = (count = 1, keywords?: string[]): string[] =>
  generateNodeArray((i) => keywords?.[i] || faker.company.name(), count);

export const fakeLocalizedCmsImage = (
  overrides?: Partial<LocalizedCmsImage>
): LocalizedCmsImage =>
  merge(
    {
      en: fakeCmsImage(),
      fi: fakeCmsImage(),
      sv: fakeCmsImage(),
      __typename: 'LocalizedCmsImage',
    },
    overrides
  );

export const fakeAboutPages = (
  count = 1,
  aboutPages?: Partial<StaticPage>[]
): AboutPagesResponse => ({
  data: generateNodeArray((i) => fakeStaticPage(aboutPages?.[i]), count),
  __typename: 'AboutPagesResponse',
});

export const fakeAccessibilityPages = (
  count = 1,
  accessibilityPages?: Partial<StaticPage>[]
): AccessibilityPagesResponse => ({
  data: generateNodeArray(
    (i) => fakeStaticPage(accessibilityPages?.[i]),
    count
  ),
  __typename: 'AccessibilityPagesResponse',
});

export const fakeStaticPage = (overrides?: Partial<StaticPage>): StaticPage =>
  merge(
    {
      id: faker.datatype.uuid(),
      expired: false,
      headingSection: fakeLocalizedObject(),
      contentSection: fakeLocalizedObject(),
      keywords: fakeLocalizedCmsKeywords(),
      __typename: 'StaticPage',
    },
    overrides
  );

const sentences: string[] = [];
const uniqueSentences = (): string => {
  const sentence = faker.random.words();

  if (sentences.includes(sentence)) {
    return uniqueSentences();
  } else {
    sentences.push(sentence);
  }

  return sentence;
};

export const fakeLocalizedObject = (text?: string): LocalizedObject => ({
  __typename: 'LocalizedObject',
  en: text || uniqueSentences(),
  sv: text || uniqueSentences(),
  fi: text || uniqueSentences(),
});

const generateNodeArray = <T extends (...args: any) => any>(
  fakeFunc: T,
  length: number
): ReturnType<T>[] => {
  return Array.from({ length }).map((_, i) => fakeFunc(i));
};
