import { Card, Divider, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import { MdAccountCircle, MdCalendarToday, MdGroups, MdInfo, MdLocationOn } from 'react-icons/md';

import { AddressInfo, EventDateTime, EventParticipants, EventTypeTag } from 'src/shared/design-system';

import { WithEvent } from '../../../../shared/types';
import { EventsMap } from '../EventMap';

import { EventInfoRow } from './EventInfoRow';

export const EventDetailsInfoCard = ({ event }: WithEvent) => (
  <Card
    p={4}
    boxShadow="lg"
    flexBasis="35%"
    top={{ md: '171px', base: 'auto' }}
    alignSelf={{ md: 'flex-start', base: 'auto' }}
    position={{ md: 'sticky', base: 'static' }}
  >
    <VStack alignItems="start" spacing={4} justifyContent="center">
      <Stack>
        <Heading fontSize="lg">Summary</Heading>
        <Text>{event.summary}</Text>
      </Stack>
      <Divider />
      <EventInfoRow icon={MdAccountCircle}>
        <Text>
          Hosted by:{' '}
          <Text as="b">
            {event.author ? `${event.author.first_name} ${event.author.last_name}` : event.group?.name}
          </Text>
        </Text>
      </EventInfoRow>
      <EventInfoRow icon={MdInfo}>
        {event.event_types.map((eventType) => (
          <EventTypeTag key={eventType.id} eventType={eventType} />
        ))}
      </EventInfoRow>
      <EventInfoRow icon={MdGroups}>
        <EventParticipants noIcon fontSize="md" capacity={event.capacity} participants={event.participants} />
      </EventInfoRow>
      <EventInfoRow icon={MdCalendarToday}>
        <EventDateTime noIcon fontSize="md" startDateTime={event.start_datetime} endDateTime={event.end_datetime} />
      </EventInfoRow>
      <EventInfoRow icon={MdLocationOn}>
        <AddressInfo noIcon fontSize="md" location={event.location} />
      </EventInfoRow>
      <EventsMap events={[event]} height="22.7vh" />
    </VStack>
  </Card>
);

