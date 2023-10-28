import { Card, CardBody, Heading, HStack, Image, Link, Stack, Tag, Text, Tooltip } from '@chakra-ui/react';

import postcardBackgroundImageUrl from 'src/assets/img/event-image-placeholder.jpg';
import { Button, EventTypeIcon } from 'src/shared/design-system';

import { EventTypeName, WithEvent } from '../../types';
import { EventStatusTag } from '../EventStatusTag';

import { EventAddress } from './EventAddress';
import { EventDateTime } from './EventDateTime';
import { EventParticipants } from './EventParticipants';

interface EventCardProps extends WithEvent {
  simplified?: boolean;
}

export const EventCard = ({ event, simplified }: EventCardProps) => {
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
            <Image src={postcardBackgroundImageUrl} borderTopRadius="none" />
          </>
        )}
        <Stack justifyContent="space-between" flex="1" spacing="2" p="4">
          <Stack>
            <Heading size="md" noOfLines={3} lineHeight="initial">
              <Link>{event.name}</Link>
            </Heading>
            <HStack>
              {event.event_types.map(({ name }) => (
                <Tooltip key={name} label={name}>
                  <Tag colorScheme="purple" size="lg">
                    <EventTypeIcon eventTypeName={name as EventTypeName} />
                  </Tag>
                </Tooltip>
              ))}
            </HStack>
            <Text color="purple.600" as="b">
              Hosted by: {event.author.name}
            </Text>
            <Stack spacing="2">
              <EventDateTime startDateTime={event.start_datetime} endDateTime={event.end_datetime} />
              <EventAddress location={event.location} />
              <EventParticipants capacity={event.capacity} participants={event.participants} />
            </Stack>
          </Stack>
          <Button
            borderRadius="full"
            size="sm"
            colorScheme="purple"
            isDisabled={isFullCapacity && !event.allow_waitlist}
          >
            {isFullCapacity && event.allow_waitlist ? 'Join Waitlist' : 'Join Event'}
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};

