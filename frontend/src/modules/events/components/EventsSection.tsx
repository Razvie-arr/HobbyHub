import { Center } from '@chakra-ui/react';

import { Button, Flex } from 'src/shared/design-system';

import { EventCard } from '../components';
import { WithEvents } from '../types';

interface EventsSectionProps extends WithEvents {
  handleShowMore: () => void;
}

export const EventsSection = ({ events, handleShowMore }: EventsSectionProps) => (
  <>
    <Center>
      <Flex flexWrap="wrap" columnGap="4">
        {events.map((value) => (
          <EventCard key={value.id} event={value} />
        ))}
      </Flex>
    </Center>
    <Flex justify="center">
      <Button size="lg" colorScheme="purple" onClick={handleShowMore}>
        Show more
      </Button>
    </Flex>
  </>
);

