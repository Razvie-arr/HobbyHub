import { useMutation, useQuery } from '@apollo/client';
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
  useToast,
  VStack,
} from '@chakra-ui/react';
import { MdAccountCircle, MdCalendarToday, MdGroups, MdInfo, MdLocationOn } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { EventTypeTag } from 'src/shared/design-system';

import { route } from '../../../route';
import { ContentContainer, QueryResult } from '../../../shared/layout';
import { useAuth } from '../../auth';
import { EventAddress, EventDateTime, EventParticipants } from '../components';
import { getEventFragmentData } from '../fragments';
import { DELETE_EVENT } from '../mutations';
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

  const [deleteEventRequest, deleteEventRequestState] = useMutation(DELETE_EVENT);

  const navigate = useNavigate();
  const toast = useToast();

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
            <Flex width="100%" bgColor="white" shadow="md" position="sticky" top="67px" zIndex={1} p={3}>
              <ContentContainer>
                <VStack alignItems="start" spacing="4">
                  <Heading as="h1" size="lg">
                    {event.name}
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
                          {user && user.id === event.author.id ? (
                            <>
                              <Button
                                as={Link}
                                to={route.editEvent(eventId)}
                                width="180px"
                                colorScheme="purple"
                                rounded="full"
                              >
                                Edit
                              </Button>
                              <DeleteEventButton
                                handleDelete={async () => {
                                  await deleteEventRequest({
                                    variables: {
                                      eventId,
                                      locationId: event.location.id,
                                    },
                                  });
                                  toast({
                                    variant: 'left-accent',
                                    status: 'success',
                                    position: 'top-right',
                                    title: 'Event deleted!',
                                    description: 'Your event was deleted successfully.',
                                  });
                                  navigate(route.home());
                                }}
                                isLoading={deleteEventRequestState.loading}
                              />
                            </>
                          ) : null}
                          {user && user.id !== event.author.id ? (
                            <>
                              <Button width="180px" colorScheme="purple" rounded="full">
                                Join Event
                              </Button>
                              <Button
                                width="180px"
                                colorScheme="purple"
                                variant="outline"
                                rounded="full"
                                bgColor="white"
                              >
                                Message
                              </Button>
                            </>
                          ) : null}
                        </ButtonGroup>
                      </Box>
                    </HStack>
                  </Flex>
                </VStack>
              </ContentContainer>
            </Flex>
            <ContentContainer>
              <HStack spacing={4} justifyContent="center">
                <Image
                  w="550px"
                  h="320px"
                  objectFit="cover"
                  alt="Event Image"
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
              </HStack>
            </ContentContainer>
            <ContentContainer>
              <Tabs>
                <TabList>
                  <Tab>Information</Tab>
                  <Tab>Participants</Tab>
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

