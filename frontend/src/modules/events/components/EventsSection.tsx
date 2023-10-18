import { ReactNode } from 'react';
import { Heading, Icon, Stack } from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa6';

import { Box, Button, Flex } from 'src/shared/design-system';

import { EventCard } from '../components';
import { WithEvents } from '../types';

interface EventsSectionProps extends WithEvents {
  title: ReactNode;
}

export const EventsSection = ({ events, title }: EventsSectionProps) => (
  <Box>
    <Stack spacing="8">
      <Heading as="h1">{title}</Heading>
      <Flex flexWrap="wrap" columnGap="4">
        {events.map((value) => (
          <EventCard key={value.id} event={value} />
        ))}
      </Flex>
      <Flex justify="center">
        <Button size="lg" colorScheme="purple">
          View all <Icon as={FaArrowRight} ml="2" />
        </Button>
      </Flex>
    </Stack>
  </Box>
);

