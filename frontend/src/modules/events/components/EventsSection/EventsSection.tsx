import { ReactNode } from 'react';
import { Button, Heading, HStack, Stack } from '@chakra-ui/react';
import { Option, pipe, ReadonlyArray } from 'effect';

import { Box } from 'src/shared/design-system';

import { EventProps } from '../../types';

import { EventsCardList } from './EventsCardList';
import { NoEvents } from './NoEvents';

interface EventsSectionProps {
  events: Array<EventProps> | null | undefined;
  title?: ReactNode;
  handleSeeAllEvents?: () => void;
}

export const EventsSection = ({ events, handleSeeAllEvents, title }: EventsSectionProps) => (
  <Box>
    <Stack spacing="8">
      <HStack justifyContent="space-between">
        {title ? <Heading as="h2">{title}</Heading> : null}{' '}
        {handleSeeAllEvents ? (
          <Button size="md" variant="link" colorScheme="purple" onClick={handleSeeAllEvents}>
            See all events
          </Button>
        ) : null}
      </HStack>
      {pipe(
        events,
        Option.fromNullable,
        Option.map(ReadonlyArray.filterMap(Option.fromNullable)),
        Option.filter(ReadonlyArray.isNonEmptyArray),
        Option.match({
          onNone: () => <NoEvents />,
          onSome: (nonEmptyEvents) => <EventsCardList events={nonEmptyEvents} handleShowMore={() => {}} />,
        }),
      )}
    </Stack>
  </Box>
);

