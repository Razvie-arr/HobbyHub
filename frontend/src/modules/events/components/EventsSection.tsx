import { ReactNode } from 'react';
import { Heading, Icon, Stack } from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa6';

import { Box, Button, Flex } from 'src/shared/design-system';

import { EventCard } from '../components';
import { EventProps } from '../types';

interface EventsSectionProps {
  title: ReactNode;
  events: Array<EventProps>;
}

export const EventsSection = ({ events, title }: EventsSectionProps) => (
  <Box>
    <Stack spacing="8">
      <Heading as="h1">{title}</Heading>
      <Flex flexWrap="wrap" columnGap="12">
        {events.map((value) => <EventCard key={value.id} {...value} />).slice(0, 5)}
      </Flex>
      <Flex justify="center">
        <Button size="lg" colorScheme="purple">
          View all <Icon as={FaArrowRight} ml="2" />
        </Button>
      </Flex>
    </Stack>
  </Box>
);

