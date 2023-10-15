import { Card, CardBody, Heading, Icon, Image, Stack, Text } from '@chakra-ui/react';
import { FaLocationDot, FaPeopleGroup } from 'react-icons/fa6';

import { Box, Button } from 'src/shared/design-system';

import { EventProps } from '../types';

const localeTimeStringOptions = {
  hourCycle: 'h24',
  hour: '2-digit',
  minute: '2-digit',
} as const;

export const EventCard = (props: EventProps) => {
  const { locale } = Intl.DateTimeFormat().resolvedOptions();
  const eventStartDate = new Date(props.start_datetime);
  const eventEndDate = new Date(props.start_datetime);
  return (
    <Card
      flexBasis={{ xl: '31%', md: '46%' }}
      mb="12"
      borderColor="purple.300"
      borderWidth="2px"
      backgroundColor="gray.50"
    >
      <CardBody p="0">
        <Image
          src="src/assets/img/cute-purple-aesthetic-abstract-minimal-background-perfect-for-wallpaper-backdrop-postcard-background-vector.jpg"
          borderTopRadius="base"
        />
        <Box px="8" py="4">
          <Stack spacing="4" justifyContent="space-between">
            <Heading size="md" noOfLines={1}>
              {props.name}
            </Heading>
            <Stack spacing="4">
              <Stack spacing="4" direction="row">
                <Stack spacing="2" flexGrow="2" justifyContent="center">
                  <Stack direction="row">
                    <Icon as={FaLocationDot} color="purple.500" />
                    <Text fontWeight="medium" fontSize="sm">
                      {props.location.city}
                    </Text>
                    <Text fontSize="sm" fontWeight="medium">
                      {eventStartDate.toLocaleTimeString(locale, localeTimeStringOptions)}
                      {' - '}
                      {eventEndDate.toLocaleTimeString(locale, localeTimeStringOptions)}
                    </Text>
                  </Stack>
                  <Stack direction="row">
                    <Icon as={FaPeopleGroup} color="purple.500" />
                    <Text fontWeight="medium" fontSize="sm">
                      2 participants / 12
                    </Text>
                  </Stack>
                </Stack>
                <Stack>
                  <Text as="b" fontSize="3xl" color="purple.800">
                    {eventStartDate.toLocaleString(locale, { day: '2-digit' })}
                  </Text>
                  <Text color="purple.800">{eventStartDate.toLocaleString(locale, { month: 'long' })}</Text>
                </Stack>
              </Stack>
              <Button colorScheme="purple">Join Event</Button>
            </Stack>
          </Stack>
        </Box>
      </CardBody>
    </Card>
  );
};

