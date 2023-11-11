import { useQuery } from '@apollo/client';

import { QueryResult } from '../../../../shared/layout';
import { getEventFragmentData } from '../../../../shared/types';
import { SIMILAR_EVENTS } from '../../queries';
import { EventsSection } from '..';

interface SimilarEventsProps {
  eventId: number;
  city: string;
  eventTypeIds: number[];
}

export const SimilarEvents = ({ eventId, eventTypeIds, city }: SimilarEventsProps) => {
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
        return <EventsSection events={events} maxColumnCount={3} />;
      }}
    />
  );
};

