import { HStack, Stack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { match } from 'ts-pattern';

import {
  AddressInfo,
  Button,
  DataCard,
  EventDateTime,
  EventParticipants,
  EventStatusTag,
  EventTypeTag,
} from 'src/shared/design-system';

import { route } from '../../../../route';
import { getCurrentDateTime } from '../../../../utils/form';
import { getLocationFragmentData, WithEvent, WithNullableAuthUser } from '../../../types';

interface EventCardProps extends WithNullableAuthUser, WithEvent {
  simplified?: boolean;
  maxFlexBasis?: string;
}

const EventCardButton = ({
  event,
  isOwner,
  hasEventExpired,
}: WithEvent & { isOwner: boolean; hasEventExpired: boolean }) => {
  const navigate = useNavigate();
  return (
    <Button
      borderRadius="full"
      size="sm"
      colorScheme="purple"
      variant={isOwner ? 'outline' : 'solid'}
      isDisabled={
        !isOwner && (hasEventExpired || (event.participants.length === event.capacity && !event.allow_waitlist))
      }
      onClick={(e) => {
        e.preventDefault();
        if (isOwner) {
          navigate(route.eventDetails(event.id));
        }
      }}
    >
      {isOwner
        ? 'Edit'
        : event.participants.length === event.capacity && event.allow_waitlist
        ? 'Join Waitlist'
        : 'Join'}
    </Button>
  );
};

export const EventCard = ({ user, event, ...other }: EventCardProps) => {
  const currentDateTime = getCurrentDateTime();
  const hasEventExpired = event.start_datetime.slice(0, 23) < currentDateTime;

  const owner = match(event.author)
    .with({ __typename: 'User' }, (author) => author)
    .with({ __typename: 'Group' }, ({ admin }) => admin)
    .exhaustive();

  const isOwner = user ? user.id === owner.id : false;

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
      actionButton={<EventCardButton event={event} hasEventExpired={hasEventExpired} isOwner={isOwner} />}
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

