import { Card, CardBody, Heading, HStack, Image, Link, Stack, Text } from '@chakra-ui/react';

import { Button, EventTypeTag } from 'src/shared/design-system';

import { route } from '../../../../route';
import { DEFAULT_EVENT_IMAGE_PATH } from '../../../../shared/constants';
import { ReactRouterLink } from '../../../../shared/navigation';
import { useAuth } from '../../../auth';
import { WithEvent } from '../../types';
import { EventStatusTag } from '../EventStatusTag';
import { EventAddress, EventDateTime, EventParticipants } from '../shared';

interface EventCardProps extends WithEvent {
  simplified?: boolean;
}

export const EventCard = ({ event, simplified }: EventCardProps) => {
  const { user } = useAuth();
  const isFullCapacity = event.participants.length === event.capacity;
  return (
    <Card
      flexBasis={{ '2xl': '24%', lg: '32%', md: '48%' }}
      backgroundColor="white"
      mb={simplified ? '0' : '12'}
      shadow="sm"
      borderRadius="none"
    >
      <CardBody p="0" display="flex" flexDirection="column">
        {simplified ? null : (
          <>
            <EventStatusTag hasWaitlist={event.allow_waitlist} isFullCapacity={isFullCapacity} />
            <Image
              h="190px"
              objectFit="cover"
              src={event.image_filepath ?? DEFAULT_EVENT_IMAGE_PATH}
              borderTopRadius="none"
            />
          </>
        )}
        <Stack justifyContent="space-between" flex="1" spacing="2" p="4">
          <Stack>
            <Heading size="md" noOfLines={3} lineHeight="initial">
              <Link to={route.eventDetails(event.id)} as={ReactRouterLink}>
                {event.name}
              </Link>
            </Heading>
            <HStack>
              {event.event_types.map((eventType) => (
                <EventTypeTag key={eventType.id} eventType={eventType} />
              ))}
            </HStack>
            <Text color="purple.600" as="b">
              Hosted by: {event.author.first_name} {event.author.last_name}
            </Text>
            <Stack spacing="2">
              <EventDateTime startDateTime={event.start_datetime} endDateTime={event.end_datetime} />
              <EventAddress location={event.location} />
              <EventParticipants capacity={event.capacity} participants={event.participants} />
            </Stack>
          </Stack>
          {user && user.id === event.author.id ? (
            <Button
              borderRadius="full"
              size="sm"
              colorScheme="purple"
              as={ReactRouterLink}
              variant="outline"
              to={route.editEvent(event.id)}
            >
              Edit event
            </Button>
          ) : null}
          {user && user.id !== event.author.id ? (
            <Button
              borderRadius="full"
              size="sm"
              colorScheme="purple"
              isDisabled={isFullCapacity && !event.allow_waitlist}
            >
              {isFullCapacity && event.allow_waitlist ? 'Join Waitlist' : 'Join Event'}
            </Button>
          ) : null}
        </Stack>
      </CardBody>
    </Card>
  );
};

