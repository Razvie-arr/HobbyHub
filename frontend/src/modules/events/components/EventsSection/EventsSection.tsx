import { ReactNode } from 'react';
import { Button, Divider, Flex, Heading, Stack } from '@chakra-ui/react';
import { ReadonlyArray } from 'effect';

import { Box } from 'src/shared/design-system';

import { EventProps } from '../../types';
import { EventCard } from '../EventCard';

import { NoEvents } from './NoEvents';

interface EventsSectionProps {
  events: Array<EventProps>;
  title?: ReactNode;
  handleSeeAllEvents?: () => void;
  maxColumnCount?: 4 | 3;
}

export const EventsSection = ({ events, handleSeeAllEvents, title, maxColumnCount = 4 }: EventsSectionProps) => (
  <Box>
    <Stack spacing="4">
      <Stack
        justifyContent="space-between"
        direction={{ base: 'column', lg: 'row' }}
        alignItems={{ base: 'start', lg: 'center' }}
      >
        {title ? <Heading as="h2">{title}</Heading> : null}{' '}
        {handleSeeAllEvents ? (
          <Button size="md" variant="link" colorScheme="purple" onClick={handleSeeAllEvents}>
            See all events
          </Button>
        ) : null}
      </Stack>
      {title ? <Divider borderColor="purple.200" /> : null}
      {ReadonlyArray.isNonEmptyArray(events) ? (
        <Flex flexWrap="wrap" columnGap="4">
          {events.map((value) => (
            <EventCard key={value.id} event={value} maxFlexBasis={maxColumnCount === 4 ? '24%' : ' 32%'} />
          ))}
        </Flex>
      ) : (
        <NoEvents />
      )}
    </Stack>
  </Box>
);

