import { Card, CardBody, Heading, HStack, Image, Link, Stack, Text } from '@chakra-ui/react';

import { Button, EventTypeTag } from 'src/shared/design-system';

import { route } from '../../../../route';
import { DEFAULT_EVENT_IMAGE_PATH } from '../../../../shared/constants';
import { ReactRouterLink } from '../../../../shared/navigation';
import { useAuth } from '../../../auth';
import { WithEvent } from '../../types';
import { EventAddress, EventDateTime, EventParticipants } from '../shared';
import { EventStatusTag } from '../shared/EventStatusTag';

interface EventCardProps extends WithEvent {
  simplified?: boolean;
  maxFlexBasis?: string;
}

export const EventCard = ({ event, simplified, maxFlexBasis = '24%' }: EventCardProps) => {
  const { user } = useAuth();
  const isFullCapacity = event.participants.length === event.capacity;
  return (
    <Card
      flexBasis={{ '2xl': maxFlexBasis, lg: '32%', md: '48%' }}
      backgroundColor="white"
      mb={simplified ? '0' : '12'}
      shadow="sm"
      role="group"
      _hover={{ shadow: 'md' }}
      transition="0.1s ease-in-out"
    >
      <Link to={route.eventDetails(event.id)} as={ReactRouterLink} _groupHover={{ textDecoration: 'none' }} h="100%">
        <CardBody p="0" display="flex" flexDirection="column" h="100%">
          {simplified ? null : (
            <>
              <EventStatusTag hasWaitlist={event.allow_waitlist} isFullCapacity={isFullCapacity} zIndex={1} />
              <Image
                aspectRatio="16/9"
                objectFit="cover"
                src={event.image_filepath ?? DEFAULT_EVENT_IMAGE_PATH}
                borderTopRadius="base"
                _groupHover={{ opacity: '0.7' }}
                transition="0.1s ease-in-out"
              />
            </>
          )}
          <Stack justifyContent="space-between" flex="1" spacing="2" p="4">
            <Stack>
              <Heading
                size="md"
                noOfLines={3}
                lineHeight="initial"
                _groupHover={{ textDecoration: 'underline' }}
                transition="0.1s ease-in-out"
              >
                {event.name}
              </Heading>
              <HStack>
                {event.event_types.map((eventType) => (
                  <EventTypeTag key={eventType.id} eventType={eventType} />
                ))}
              </HStack>
              <Text color="purple.600" as="b">
                Hosted by:{' '}
                {event.author ? `${event.author.first_name} ${event.author.last_name}` : `${event.group?.name}`}
              </Text>
              <Stack spacing="2">
                <EventDateTime startDateTime={event.start_datetime} endDateTime={event.end_datetime} />
                <EventAddress location={event.location} />
                <EventParticipants capacity={event.capacity} participants={event.participants} />
              </Stack>
            </Stack>
            {user && (user.id === event.author?.id || user.id === event.group?.admin.id) ? (
              <Button
                borderRadius="full"
                size="sm"
                colorScheme="purple"
                // as={ReactRouterLink}
                variant="outline"
                // to={route.editEvent(event.id)}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Edit event
              </Button>
            ) : null}
            {user && (user.id !== event.author?.id || user.id !== event.group?.admin.id) ? (
              <Button
                borderRadius="full"
                size="sm"
                colorScheme="purple"
                isDisabled={isFullCapacity && !event.allow_waitlist}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                {isFullCapacity && event.allow_waitlist ? 'Join Waitlist' : 'Join Event'}
              </Button>
            ) : null}
          </Stack>
        </CardBody>
      </Link>
    </Card>
  );
};

