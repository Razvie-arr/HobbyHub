import { useQuery } from '@apollo/client';

import { QueryResult } from '../../../../shared/layout';
import { renderEventList } from '../../../../shared/renderers/renderEventList';
import { getLocationFragmentData, WithEvent, WithNullableAuthUser } from '../../../../shared/types';
import { SIMILAR_EVENTS } from '../../queries';

export const SimilarEvents = ({ user, event }: WithNullableAuthUser & WithEvent) => (
  <QueryResult
    queryResult={useQuery(SIMILAR_EVENTS, {
      variables: {
        eventId: event.id,
        eventTypeIds: event.event_types.map(({ id }) => id),
        city: getLocationFragmentData(event.location).city,
      },
    })}
    queryName="similarEvents"
    render={renderEventList({ user, maxColumnCount: 3 })}
    noDataDescription={`We found no events similar to ${event.name}`}
  />
);

