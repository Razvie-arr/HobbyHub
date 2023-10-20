import { Card, CardBody, Heading, HStack, Icon, Image, Stack, Tag, Text, Tooltip } from '@chakra-ui/react';
import { FaCalendar, FaLocationDot, FaPeopleGroup } from 'react-icons/fa6';

import postcardBackgroundImageUrl from 'src/assets/img/cute-purple-aesthetic-abstract-minimal-background-perfect-for-wallpaper-backdrop-postcard-background-vector.jpg';
import { Button } from 'src/shared/design-system';

import { EventTypeName, WithEvent } from '../types';

import { EventStatusTag } from './EventStatusTag';
import { EventTypeIcon } from './EventTypeIcon';

const localeTimeStringOptions = {
  hourCycle: 'h24',
  hour: '2-digit',
  minute: '2-digit',
} as const;

interface EventCardProps extends WithEvent {
  simplified?: boolean;
}

export const EventCard = ({ event, simplified: simpleUI }: EventCardProps) => {
  const { locale } = Intl.DateTimeFormat().resolvedOptions();
  const eventStartDate = new Date(event.start_datetime);
  const eventEndDate = new Date(event.start_datetime);
  const isFullCapacity = event.participants.length === event.capacity;
  return (
    <Card
      flexBasis={{ '2xl': '24%', xl: '28%', lg: '30%', md: '46%' }}
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
              <Stack direction="row">
                <Icon as={FaCalendar} color="purple.500" />
                <Text fontSize="sm" fontWeight="medium">
                  {eventStartDate.toLocaleString(locale, { day: '2-digit' })}{' '}
                  {eventStartDate.toLocaleString(locale, { month: 'long' })}
                  {' • '}
                  {eventStartDate.toLocaleTimeString(locale, localeTimeStringOptions)}
                  {' - '}
                  {eventEndDate.toLocaleTimeString(locale, localeTimeStringOptions)}
                </Text>
              </Stack>
              <Stack direction="row">
                <Icon as={FaLocationDot} color="purple.500" />
                <Text fontWeight="medium" fontSize="sm">
                  {event.location.city}, {event.location.street_name} {event.location.street_number}
                </Text>
              </Stack>
              <Stack direction="row">
                <Icon as={FaPeopleGroup} color="purple.500" />
                <Text fontWeight="medium" fontSize="sm">
                  {`${event.participants.length} participant${event.participants.length > 1 ? 's' : ''} / ${
                    event.capacity
                  }`}
                </Text>
              </Stack>
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

