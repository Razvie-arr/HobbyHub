import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';

import { useAuth } from '../../../auth';
import { WithEvent } from '../../types';

import { EventDetailsParticipants } from './EventDetailsParticipants';
import { SimilarEvents } from './SimilarEvents';

export const EventDetailsTabs = ({ event }: WithEvent) => {
  const { user } = useAuth();
  return (
    <Tabs w="100%" colorScheme="purple">
      <TabList>
        <Tab>
          <Text as="b">Description</Text>
        </Tab>
        {user ? (
          <Tab>
            <Text as="b">Participants</Text>
          </Tab>
        ) : null}
        <Tab>
          <Text as="b">Similar</Text>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel px="0">
          <Box p={4} boxShadow="sm" bgColor="white">
            <Text whiteSpace="pre-line">{event.description}</Text>
          </Box>
        </TabPanel>
        {user ? (
          <TabPanel px="0">
            <Flex justifyContent="space-between" flexWrap="wrap">
              {event.participants.map((participant) => (
                <EventDetailsParticipants
                  key={participant.id}
                  name={`${participant.first_name} ${participant.last_name}`}
                  primaryButtonText="MESSAGE"
                />
              ))}
            </Flex>
          </TabPanel>
        ) : null}
        <TabPanel px="0">
          <SimilarEvents
            city={event.location.city}
            eventId={event.id}
            eventTypeIds={event.event_types.map(({ id }) => id)}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

