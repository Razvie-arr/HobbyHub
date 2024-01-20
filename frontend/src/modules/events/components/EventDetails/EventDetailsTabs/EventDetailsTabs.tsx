import { Box, Text } from '@chakra-ui/react';

import { DataDetailsTabs } from '../../../../../shared/design-system';
import { WithEvent, WithNullableAuthUser } from '../../../../../shared/types';

import { EventParticipants } from './EventParticipants';
import { SimilarEvents } from './SimilarEvents';

export const EventDetailsTabs = ({ event, user }: WithEvent & WithNullableAuthUser) => {
  const tabs = [
    {
      title: 'Participants',
      content: <EventParticipants event={event} user={user} />,
    },
    {
      title: 'Similar events',
      content: <SimilarEvents event={event} user={user} />,
    },
  ];

  return (
    <DataDetailsTabs
      tabs={
        event.description
          ? [
              {
                title: 'Description',
                content: (
                  <Box p={4} boxShadow="sm" bgColor="white">
                    <Text whiteSpace="pre-line">{event.description}</Text>
                  </Box>
                ),
              },
              ...tabs,
            ]
          : tabs
      }
    />
  );
};

