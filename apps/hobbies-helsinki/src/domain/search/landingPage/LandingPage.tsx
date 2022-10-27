import { Hero } from 'events-helsinki-components/components';
import React from 'react';
import type { PageContentLayoutProps } from 'react-helsinki-headless-cms';
import { PageSection, ContentContainer } from 'react-helsinki-headless-cms';
import type { LandingPageQuery } from 'react-helsinki-headless-cms/apollo';
import { MAIN_CONTENT_ID } from '../../../constants';

import LandingPageSearch from '../landingPageSearch/LandingPageSearch';
import styles from './landingPage.module.scss';

export type LandingPageProps = {
  landingPage?: LandingPageQuery['landingPage'];
};

export function LandingPageContentLayout({
  landingPage,
  collections,
}: LandingPageProps & PageContentLayoutProps) {
  const { title, description, heroLink } = landingPage?.translation || {};
  const heroImage =
    landingPage?.desktopImage?.edges?.[0]?.node?.mediaItemUrl ?? undefined;

  const [firstCollection, ...restCollections] =
    (collections as React.ReactNode[]) ?? [];
  const lastCollection = restCollections.pop();

  return (
    <div className={styles.layout}>
      <main className={styles.main} id={MAIN_CONTENT_ID}>
        <div className={styles.highlight}>
          {landingPage?.translation && (
            <PageSection
              className={styles.sectionHero}
              korosBottom
              korosBottomClassName={styles.korosBottomHero}
              backgroundImageUrl={heroImage}
            >
              <ContentContainer>
                {heroLink && heroLink.length > 0 && (
                  <Hero
                    title={title ?? ''}
                    description={description ?? ''}
                    cta={{
                      label: heroLink[0] ?? '',
                      href: heroLink[1] ?? '',
                    }}
                  />
                )}
              </ContentContainer>
            </PageSection>
          )}
          <PageSection className={styles.sectionSearch}>
            <ContentContainer>
              <div className={styles.sectionSearchContent}>
                <LandingPageSearch />
              </div>
            </ContentContainer>
          </PageSection>
        </div>
        {firstCollection && (
          <PageSection
            korosTop
            korosTopClassName={styles.korosTopCollectionsFirst}
            className={styles.sectionCollectionsFirst}
          >
            <ContentContainer>{firstCollection}</ContentContainer>
          </PageSection>
        )}
        {restCollections && (
          <PageSection
            korosTop
            korosTopClassName={styles.korosTopCollectionsRest}
            className={styles.sectionCollections}
          >
            <ContentContainer>{restCollections}</ContentContainer>
          </PageSection>
        )}
        {lastCollection && (
          <PageSection
            korosTop
            korosBottom
            korosTopClassName={styles.korosTopCollectionsLast}
            korosBottomClassName={styles.korosBottomCollectionsLast}
            className={styles.sectionCollectionsLast}
          >
            <ContentContainer>{lastCollection}</ContentContainer>
          </PageSection>
        )}
      </main>
    </div>
  );
}
