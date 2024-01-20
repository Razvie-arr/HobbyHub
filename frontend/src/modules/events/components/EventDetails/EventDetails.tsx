import { match } from 'ts-pattern';

import {
  DataDetailsContainer,
  DataDetailsContent,
  DataDetailsHeader,
  EventStatusTag,
} from '../../../../shared/design-system';
import { WithEvent } from '../../../../shared/types';
import { getCurrentDateTime } from '../../../../utils/form';
import { useAuth } from '../../../auth';
import { SendMessageModal } from '../../../messages';
import { JoinEventModal } from '../JoinEventModal';
import { DeleteEventButton, EditEventButton } from '../shared';

import { EventDetailsSideCard } from './EventDetailsSideCard';
import { EventDetailsTabs } from './EventDetailsTabs';

export const EventDetails = ({ event }: WithEvent) => {
  const { user } = useAuth();

  const organizer = match(event.author)
    .with({ __typename: 'User' }, (author) => author)
    .with({ __typename: 'Group' }, ({ admin }) => admin)
    .exhaustive();

  const isUserOrganizer = user && user.id === organizer.id;
  const hasEventExpired = event.start_datetime.slice(0, 23) < getCurrentDateTime();

  return (
    <DataDetailsContainer>
      <DataDetailsHeader
        title={
          <>
            {event.name}{' '}
            <EventStatusTag
              hasExpired={hasEventExpired}
              hasWaitlist={event.allow_waitlist}
              isFullCapacity={event.participants.length === event.capacity}
            />
          </>
        }
        actionButtons={
          isUserOrganizer ? (
            <>
              <EditEventButton eventId={event.id} colorScheme="purple" rounded="full" />
              <DeleteEventButton event={event} borderRadius="full" colorScheme="purple" variant="outline" />
            </>
          ) : (
            <>
              <JoinEventModal user={user} event={event} />
              {user ? <SendMessageModal user={user} recipient={organizer} /> : null}
            </>
          )
        }
      />
      <DataDetailsContent
        imageFilepath={event.image_filepath}
        sideCard={<EventDetailsSideCard event={event} />}
        tabs={<EventDetailsTabs event={event} user={user} />}
      />
    </DataDetailsContainer>
  );
};

