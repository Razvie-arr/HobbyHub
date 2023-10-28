import { Box } from '@chakra-ui/react';

import { Flex } from 'src/shared/design-system';

import { WithEvents } from '../../types';
import { EventCard } from '../EventCard';

export const EventsCardList = ({ events }: WithEvents) => (
  <Box>
    <Flex flexWrap="wrap" columnGap="4">
      {events.map((value) => (
        <EventCard key={value.id} event={value} />
      ))}
    </Flex>
  </Box>
);

