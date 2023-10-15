import { Card, CardBody, Heading, Icon, Image, Stack, Tag, Text } from '@chakra-ui/react';
import { FaCalendar, FaLocationDot, FaPeopleGroup, FaVolleyball } from 'react-icons/fa6';

import { Box, Button } from 'src/shared/design-system';

import { WithEvent } from '../types';

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
  return (
    <Card
      flexBasis={{ xl: '31%', md: '46%' }}
      {...(simpleUI
        ? { shadow: 'none' }
        : { borderColor: 'purple.300', borderWidth: '2px', backgroundColor: 'gray.50', mb: '12' })}
    >
      <CardBody p="0">
        {simpleUI ? null : (
          <>
            <Tag position="absolute" top="4" left="4" size="lg" borderRadius="full" lineHeight="2.4" shadow="base">
              New
            </Tag>
            <Button position="absolute" top="4" right="4" borderRadius="full" shadow="base">
              See details
            </Button>
            <Image
              src="src/assets/img/cute-purple-aesthetic-abstract-minimal-background-perfect-for-wallpaper-backdrop-postcard-background-vector.jpg"
              borderTopRadius="base"
            />
          </>
        )}
        <Box px="8" py="4">
          <Stack spacing="4" justifyContent="space-between">
            <Heading size="md" noOfLines={1} lineHeight="initial">
              {event.name}
            </Heading>
            <Box>
              <Tag colorScheme="purple" size="lg">
                <Icon as={FaVolleyball} />
              </Tag>
            </Box>
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
                  2 participants / 12
                </Text>
              </Stack>
            </Stack>
            <Button colorScheme="purple">{simpleUI ? 'See details' : 'Join Event'}</Button>
          </Stack>
        </Box>
      </CardBody>
    </Card>
  );
};

