import { HStack, Stack, Text } from '@chakra-ui/react';
import { match } from 'ts-pattern';

import {
  AddressInfo,
  DataCard,
  EventDateTime,
  EventParticipants,
  EventStatusTag,
  EventTypeTag,
} from 'src/shared/design-system';

import { JoinEventModal } from '../../../../modules/events';
import { route } from '../../../../route';
import { getCurrentDateTime } from '../../../../utils/form';
import { getLocationFragmentData, WithEvent, WithNullableAuthUser } from '../../../types';

interface EventCardProps extends WithNullableAuthUser, WithEvent {
  simplified?: boolean;
  maxFlexBasis?: string;
}

export const EventCard = ({ user, event, ...other }: EventCardProps) => {
  const currentDateTime = getCurrentDateTime();
  const hasEventExpired = event.start_datetime.slice(0, 23) < currentDateTime;

  return (
    <DataCard
      dataRoute={route.eventDetails(event.id)}
      cardTag={
        <EventStatusTag
          hasExpired={hasEventExpired}
          hasWaitlist={event.allow_waitlist}
          isFullCapacity={event.participants.length === event.capacity}
          shadow="base"
          position="absolute"
          top="4"
          left="4"
          zIndex={1}
        />
      }
      imageFilepath={event.image_filepath}
      title={event.name}
      actionButton={<JoinEventModal user={user} event={event} />}
      {...other}
    >
      <HStack>
        {event.event_types.map((eventType) => (
          <EventTypeTag key={eventType.id} eventType={eventType} />
        ))}
      </HStack>
      <Text color="purple.600" as="b">
        {`Hosted by: ${match(event.author)
          .with({ __typename: 'User' }, ({ first_name, last_name }) => `${first_name} ${last_name}`)
          .with({ __typename: 'Group' }, ({ name }) => name)
          .exhaustive()}`}
      </Text>
      <Stack spacing="2">
        <EventDateTime startDateTime={event.start_datetime} endDateTime={event.end_datetime} />
        <AddressInfo location={getLocationFragmentData(event.location)} />
        <EventParticipants capacity={event.capacity} participants={event.participants} />
      </Stack>
    </DataCard>
  );
};

