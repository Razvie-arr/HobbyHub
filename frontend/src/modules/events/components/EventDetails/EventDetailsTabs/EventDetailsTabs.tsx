import { Box, Text } from '@chakra-ui/react';
import { Option, pipe, ReadonlyArray } from 'effect';

import { DataDetailsTabs } from 'src/shared/design-system';
import { WithEvent, WithNullableAuthUser } from 'src/shared/types';

import { EventParticipants } from './participants';
import { SimilarEvents } from './similarEvents';

export const EventDetailsTabs = ({ event, user }: WithEvent & WithNullableAuthUser) => (
  <DataDetailsTabs
    tabs={pipe(
      [
        event.description
          ? {
              title: 'Description',
              content: (
                <Box p={4} boxShadow="sm" bgColor="white">
                  <Text whiteSpace="pre-line">{event.description}</Text>
                </Box>
              ),
            }
          : null,
        user
          ? {
              title: 'Participants',
              content: <EventParticipants event={event} user={user} />,
            }
          : null,
        {
          title: 'Similar events',
          content: <SimilarEvents event={event} user={user} />,
        },
      ],
      ReadonlyArray.filterMap(Option.fromNullable),
    )}
  />
);

