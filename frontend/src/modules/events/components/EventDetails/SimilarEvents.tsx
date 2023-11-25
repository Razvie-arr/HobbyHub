import { useQuery } from '@apollo/client';

import { DataList } from '../../../../shared/design-system/organisms/DataList';
import { QueryResult } from '../../../../shared/layout';
import { getEventFragmentData, WithEvent, WithNullableAuthUser } from '../../../../shared/types';
import { SIMILAR_EVENTS } from '../../queries';

interface SimilarEventsProps extends WithNullableAuthUser, WithEvent {}

export const SimilarEvents = ({ user, event }: SimilarEventsProps) => {
  const similarEventsQueryResult = useQuery(SIMILAR_EVENTS, {
    variables: {
      eventId: event.id,
      eventTypeIds: event.event_types.map(({ id }) => id),
      city: event.location.city,
    },
  });
  return (
    <QueryResult
      queryResult={similarEventsQueryResult}
      queryName="similarEvents"
      render={(similarEvents) => (
        <DataList user={user} type="event" dataArray={similarEvents.map(getEventFragmentData)} maxColumnCount={3} />
      )}
      noDataDescription={`We found no events similar to ${event.name}`}
    />
  );
};

