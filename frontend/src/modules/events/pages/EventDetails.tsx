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
import { useParams } from 'react-router-dom';

import { EventTypeTag } from 'src/shared/design-system';

import { ContentContainer } from '../../../shared/layout';
import { EventAddress, EventDateTime, EventParticipants } from '../components';
import { getEventFragmentData } from '../fragments';
import { EVENT } from '../queries';

import { EventDetailsParticipants } from './EventDetailsParticipants';

interface EventDetailsProps {
  eventId: number;
}

const EventDetails = ({ eventId }: EventDetailsProps) => {
  const result = useQuery(EVENT, {
    variables: { eventId },
  });
  const eventFragment = result.data?.eventById;
  if (!eventFragment) {
    return null;
  }
  const event = getEventFragmentData(eventFragment);

  return (
    <Stack spacing="8">
      <Flex width="100%" bgColor="white" shadow="md" position="sticky" top="67px" zIndex={1} p={3}>
        <ContentContainer>
          <Heading as="h1" size="lg">
            {event.name}
          </Heading>
          <Flex>
            <HStack justifyContent="space-between" bgColor="white" flexBasis="100%">
              <HStack>
                <IconButton
                  isRound={true}
                  color="purple.500"
                  bgColor="white"
                  alignSelf="center"
                  aria-label="Profile"
                  icon={<MdAccountCircle />}
                  fontSize="40"
                />
                <VStack p={1} spacing="1px">
                  <Text>Hosted By:</Text>
                  <Heading as="h2" size="md">
                    {event.author.name}
                  </Heading>
                </VStack>
              </HStack>
              <Box>
                <ButtonGroup spacing="6">
                  <Button width="180px" colorScheme="purple" variant="solid" rounded="full">
                    Join Event
                  </Button>
                  <Button width="180px" colorScheme="purple" variant="outline" rounded="full" bgColor="white">
                    Message
                  </Button>
                </ButtonGroup>
              </Box>
            </HStack>
          </Flex>
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
                  <EventTypeTag eventType={eventType} />
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
                <EventParticipants noIcon fontSize="md" capacity={event.capacity} participants={event.participants} />
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
                  <Text>{event.description}</Text>
                </Stack>
              </Box>
            </TabPanel>
            <TabPanel>
              <Flex justifyContent="space-between" flexWrap="wrap">
                {event.participants.map((participant) => (
                  <EventDetailsParticipants name={participant.name} primaryButtonText="MESSAGE" />
                ))}
              </Flex>
            </TabPanel>
            <TabPanel>
              <Heading size="md">Related Events</Heading>
              <Box>
                <Text>Here are going to be cards of related events.</Text>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ContentContainer>
    </Stack>
  );
};

export const EventDetailsContainer = () => {
  let param = useParams();

  return param.eventId ? <EventDetails eventId={parseInt(param.eventId)} /> : null;
};
