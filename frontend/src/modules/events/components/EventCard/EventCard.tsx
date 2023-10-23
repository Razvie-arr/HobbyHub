import { Card, CardBody, Heading, HStack, Image, Stack, Tag, Text, Tooltip } from '@chakra-ui/react';

import postcardBackgroundImageUrl from 'src/assets/img/cute-purple-aesthetic-abstract-minimal-background-perfect-for-wallpaper-backdrop-postcard-background-vector.jpg';
import { Button } from 'src/shared/design-system';

import { EventTypeName, WithEvent } from '../../types';
import { EventStatusTag } from '../EventStatusTag';
import { EventTypeIcon } from '../EventTypeIcon';

import { EventAddress } from './EventAddress';
import { EventDateTime } from './EventDateTime';
import { EventParticipants } from './EventParticipants';

interface EventCardProps extends WithEvent {
  simplified?: boolean;
}

export const EventCard = ({ event, simplified: simpleUI }: EventCardProps) => {
  const isFullCapacity = event.participants.length === event.capacity;
  return (
    <Card
      flexBasis={{ '2xl': '24%', lg: '32%', md: '48%' }}
      {...(simpleUI
        ? { shadow: 'none' }
        : { borderColor: 'purple.50', borderWidth: '1px', backgroundColor: 'gray.50', mb: '4' })}
    >
      <CardBody p="0" display="flex" flexDirection="column">
        {simpleUI ? null : (
          <>
            <EventStatusTag hasWaitlist={event.allow_waitlist} isFullCapacity={isFullCapacity} />
            <Button
              position="absolute"
              top="4"
              right="4"
              borderRadius="full"
              shadow="base"
              variant="outline"
              colorScheme="purple"
              backgroundColor="white"
            >
              See details
            </Button>
            <Image src={postcardBackgroundImageUrl} borderTopRadius="base" />
          </>
        )}
        <Stack justifyContent="space-between" flex="1" spacing="2" px="3" py="2">
          <Stack>
            <Heading size="md" noOfLines={1} lineHeight="initial">
              {event.name}
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
            <Text color="gray.600" fontWeight="medium">
              Hosted by: {event.author.name}
            </Text>
            <Stack spacing="2">
              <EventDateTime startDateTime={event.start_datetime} endDateTime={event.end_datetime} />
              <EventAddress location={event.location} />
              <EventParticipants capacity={event.capacity} participants={event.participants} />
            </Stack>
          </Stack>
          <Button colorScheme="purple" isDisabled={isFullCapacity && !event.allow_waitlist}>
            {simpleUI ? 'See details' : isFullCapacity && event.allow_waitlist ? 'Join Waitlist' : 'Join Event'}
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};

