import { useQuery } from '@apollo/client';

import { DataList } from '../../../../shared/design-system/organisms/DataList';
import { QueryResult } from '../../../../shared/layout';
import { getEventFragmentData, WithNullableAuthUser } from '../../../../shared/types';
import { SIMILAR_EVENTS } from '../../queries';

interface SimilarEventsProps extends WithNullableAuthUser {
  eventId: number;
  city: string;
  eventTypeIds: number[];
}

export const SimilarEvents = ({ user, eventId, eventTypeIds, city }: SimilarEventsProps) => {
  const similarEventsQueryResult = useQuery(SIMILAR_EVENTS, {
    variables: {
      eventId,
      eventTypeIds,
      city,
    },
  });
  return (
    <QueryResult
      queryResult={similarEventsQueryResult}
      render={({ similarEvents }) => {
        if (!similarEvents) {
          return null;
        }
        const events = similarEvents.map(getEventFragmentData);
        return <DataList user={user} type="event" dataArray={events} maxColumnCount={3} />;
      }}
    />
  );
};

