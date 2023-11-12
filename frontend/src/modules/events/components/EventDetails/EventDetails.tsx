import { route } from '../../../../route';
import { DataDetails } from '../../../../shared/design-system';
import { WithEvent } from '../../../../shared/types';
import { useAuth } from '../../../auth';
import { DeleteEventButton } from '../shared';

import { SimilarEvents } from './SimilarEvents';

export const EventDetails = ({ event }: WithEvent) => {
  const { user } = useAuth();
  return (
    <DataDetails
      user={user}
      type="event"
      data={event}
      editRoute={route.editEvent(event.id)}
      additionalTabs={[
        {
          title: 'Similar events',
          content: (
            <SimilarEvents
              city={event.location.city}
              eventId={event.id}
              eventTypeIds={event.event_types.map(({ id }) => id)}
              user={user}
            />
          ),
        },
      ]}
      deleteButton={<DeleteEventButton event={event} borderRadius="full" colorScheme="purple" variant="outline" />}
    />
  );
};

