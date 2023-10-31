import { useQuery } from '@apollo/client';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import { MdAccountCircle, MdCalendarToday, MdGroups, MdInfo, MdLocationOn } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';

import { EventTypeTag } from 'src/shared/design-system';

import { route } from '../../../route';
import { ContentContainer, QueryResult } from '../../../shared/layout';
import { useAuth } from '../../auth';
import { EventAddress, EventDateTime, EventParticipants, EventsMapButton } from '../components';
import { getEventFragmentData } from '../fragments';
import { EVENT } from '../queries';

import { DeleteEventButton } from './DeleteEventButton';
import { EventDetailsParticipants } from './EventDetailsParticipants';
import { SimilarEvents } from './SimilarEvents';

interface EventDetailsProps {
  eventId: number;
}

const EventDetails = ({ eventId }: EventDetailsProps) => {
  const { user } = useAuth();

  const eventQueryResult = useQuery(EVENT, {
    variables: { eventId },
  });

  return (
    <QueryResult
      queryResult={eventQueryResult}
      render={(data) => {
        const eventFragment = data?.eventById;
        if (!eventFragment) {
          return null;
        }
        const event = getEventFragmentData(eventFragment);

        return (
          <Stack spacing="8">
            <Flex
              width="100%"
              bgColor="white"
              shadow="md"
              position="sticky"
              top={{ base: '57px', md: '67px' }}
              zIndex={1}
              py={4}
            >
              <ContentContainer>
                <VStack alignItems="start" spacing="4">
                  <Heading as="h1" size="lg">
                    {event.name}{' '}
                    <EventsMapButton events={[event]} size="md" m="0" ml={{ base: 0, md: 2 }} forceRender iconOnly />
                  </Heading>
                  <Flex w="100%">
                    <HStack justifyContent="space-between" bgColor="white" flexBasis="100%">
                      <HStack spacing={4}>
                        <IconButton
                          isRound={true}
                          color="purple.500"
                          bgColor="white"
                          alignSelf="center"
                          aria-label="Profile"
                          icon={<MdAccountCircle />}
                          fontSize="40"
                          display={{ base: 'none', lg: 'initial' }}
                        />
                        <VStack spacing="0.5" alignItems="start">
                          <Text>Hosted by:</Text>
                          <Heading as="h2" size="md">
                            {event.author.first_name} {event.author.last_name}
                          </Heading>
                        </VStack>
                      </HStack>
                      <Box>
                        <ButtonGroup spacing="6">
                          <Stack direction={{ base: 'column', lg: 'row' }}>
                            {user && user.id === event.author.id ? (
                              <>
                                <Button as={Link} to={route.editEvent(eventId)} colorScheme="purple" rounded="full">
                                  Edit
                                </Button>
                                <DeleteEventButton
                                  event={event}
                                  colorScheme="purple"
                                  rounded="full"
                                  variant="outline"
                                />
                              </>
                            ) : null}
                            {user && user.id !== event.author.id ? (
                              <>
                                <Button colorScheme="purple" rounded="full">
                                  Join Event
                                </Button>
                                <Button colorScheme="purple" rounded="full" variant="outline" bgColor="white">
                                  Message
                                </Button>
                              </>
                            ) : null}
                          </Stack>
                        </ButtonGroup>
                      </Box>
                    </HStack>
                  </Flex>
                </VStack>
              </ContentContainer>
            </Flex>
            <ContentContainer>
              <Stack spacing={4} justifyContent="center" direction={{ base: 'column', lg: 'row' }}>
                <Image
                  w="550px"
                  h="320px"
                  objectFit="cover"
                  alt="Event Image"
                  src={event.image_filepath ?? ''}
                  fallbackSrc="https://via.placeholder.com/150"
                />
                <Card p={8} boxShadow="sm">
                  <VStack alignItems="start" spacing={8}>
                    <HStack spacing={4}>
                      <Icon as={MdInfo} boxSize={10} color="purple.500" />
                      {event.event_types.map((eventType) => (
                        <EventTypeTag key={eventType.id} eventType={eventType} />
                      ))}
                    </HStack>
                    <HStack spacing={4}>
                      <Icon as={MdCalendarToday} boxSize={10} color="purple.500" />
                      <EventDateTime
                        noIcon
                        fontSize="md"
                        startDateTime={event.start_datetime}
                        endDateTime={event.end_datetime}
                      />
                    </HStack>
                    <HStack spacing={4}>
                      <Icon as={MdLocationOn} boxSize={10} color="purple.500" />
                      <EventAddress noIcon fontSize="md" location={event.location} />
                    </HStack>
                    <HStack spacing={4}>
                      <Icon as={MdGroups} boxSize={10} color="purple.500" />
                      <EventParticipants
                        noIcon
                        fontSize="md"
                        capacity={event.capacity}
                        participants={event.participants}
                      />
                    </HStack>
                  </VStack>
                </Card>
              </Stack>
            </ContentContainer>
            <ContentContainer>
              <Tabs>
                <TabList>
                  <Tab>Information</Tab>
                  {user ? <Tab>Participants</Tab> : null}
                  <Tab>Related Events</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Box p={5} boxShadow="sm" bgColor="white">
                      <Stack spacing={3}>
                        <Heading fontSize="ml">Summary</Heading>
                        <Text>{event.summary}</Text>
                        <Divider />
                        <Heading fontSize="ml">Description</Heading>
                        <Text whiteSpace="pre-line">{event.description}</Text>
                      </Stack>
                    </Box>
                  </TabPanel>
                  {user ? (
                    <TabPanel>
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
                  <TabPanel>
                    <SimilarEvents
                      city={event.location.city}
                      eventId={eventId}
                      eventTypeIds={event.event_types.map(({ id }) => id)}
                    />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </ContentContainer>
          </Stack>
        );
      }}
    />
  );
};

export const EventDetailsContainer = () => {
  let param = useParams();

  return param.eventId ? <EventDetails eventId={parseInt(param.eventId)} /> : null;
};

