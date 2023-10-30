import { ReactNode } from 'react';
import { Button, Divider, Heading, Stack } from '@chakra-ui/react';
import { ReadonlyArray } from 'effect';

import { Box } from 'src/shared/design-system';

import { EventProps } from '../../types';

import { EventsCardList } from './EventsCardList';
import { NoEvents } from './NoEvents';

interface EventsSectionProps {
  events: Array<EventProps>;
  title?: ReactNode;
  handleSeeAllEvents?: () => void;
}

export const EventsSection = ({ events, handleSeeAllEvents, title }: EventsSectionProps) => (
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
      {ReadonlyArray.isNonEmptyArray(events) ? <EventsCardList events={events} /> : <NoEvents />}
    </Stack>
  </Box>
);

