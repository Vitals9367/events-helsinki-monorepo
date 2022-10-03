import { useTranslation } from 'next-i18next';
import React from 'react';
import { IconCalendarClock, IconLocation } from 'hds-react';
import { useLocale } from 'events-helsinki-components';
import { getDateRangeStr } from 'events-helsinki-components';

import { EventFieldsFragment } from '../../nextApi/graphql/generated/graphql';
import { getEventFields } from '../EventUtils';
import LocationText from '../eventLocation/EventLocationText';
import styles from './eventDetails.module.scss';
import EventKeywords from '../eventKeywords/EventKeywords';

export type EventDetailsProps = {
  event: EventFieldsFragment;
};
const EventDetails: React.FC<EventDetailsProps> = (props) => {
  const event = props.event;
  const { t } = useTranslation();
  const locale = useLocale();

  if (!event) {
    return null;
  }

  const { startTime, endTime, location } = getEventFields(event, locale);

  return (
    <div>
      {!!startTime && (
        <div className={styles.infoRow}>
          <div className={styles.withIcon}>
            <IconCalendarClock aria-hidden />
            {getDateRangeStr({
              start: startTime,
              end: endTime,
              locale,
              includeTime: true,
              timeAbbreviation: t('common:timeAbbreviation'),
            })}
          </div>
        </div>
      )}
      {location && (
        <div className={styles.infoRow}>
          <div className={styles.withIcon}>
            <IconLocation aria-hidden />
            <LocationText event={event} showDistrict={false} showLocationName />
          </div>
        </div>
      )}
      <div className={styles.infoRow}>
        <EventKeywords event={event} showIsFree />
      </div>
    </div>
  );
};

export default EventDetails;
