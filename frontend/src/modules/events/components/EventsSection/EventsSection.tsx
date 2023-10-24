import { ReactNode } from 'react';
import { Heading, Stack } from '@chakra-ui/react';
import { Option, pipe, ReadonlyArray } from 'effect';

import { Box } from 'src/shared/design-system';

import { EventProps } from '../../types';

import { EventsCardList } from './EventsCardList';
import { NoEvents } from './NoEvents';

interface EventsSectionProps {
  events: Array<EventProps> | null | undefined;
  title: ReactNode;
}

export const EventsSection = ({ events, title }: EventsSectionProps) => (
  <Box>
    <Stack spacing="8">
      <Heading as="h1">{title}</Heading>
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

