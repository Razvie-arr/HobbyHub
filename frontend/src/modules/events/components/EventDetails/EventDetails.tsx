import { Box, Flex, Text } from '@chakra-ui/react';
import { Option, pipe, ReadonlyArray } from 'effect';
import { MdAccountCircle, MdCalendarToday, MdGroups, MdInfo, MdLocationOn } from 'react-icons/md';
import { match } from 'ts-pattern';

import { ParticipantState } from '../../../../gql/graphql';
import { route } from '../../../../route';
import {
  AddressInfo,
  DataDetailsContainer,
  DataDetailsContent,
  DataDetailsHeader,
  EventDateTime,
  EventParticipants,
  EventStatusTag,
  EventTypeTag,
  Link,
  NoData,
} from '../../../../shared/design-system';
import { ReactRouterLink } from '../../../../shared/navigation';
import { getLocationFragmentData, WithEvent } from '../../../../shared/types';
import { getCurrentDateTime } from '../../../../utils/form';
import { useAuth } from '../../../auth';
import { SendMessageModal } from '../../../messages';
import { JoinEventModal } from '../JoinEventModal';
import { DeleteEventButton, EditEventButton } from '../shared';

import { EventParticipantItem } from './EventParticipantItem';
import { SimilarEvents } from './SimilarEvents';

export const EventDetails = ({ event }: WithEvent) => {
  const { user } = useAuth();

  const organizer = match(event.author)
    .with({ __typename: 'User' }, (author) => author)
    .with({ __typename: 'Group' }, ({ admin }) => admin)
    .exhaustive();

  const isUserOrganizer = user && user.id === organizer.id;
  const hasEventExpired = event.start_datetime.slice(0, 23) < getCurrentDateTime();

  return (
    <DataDetailsContainer>
      <DataDetailsHeader
        title={
          <>
            {event.name}{' '}
            <EventStatusTag
              hasExpired={hasEventExpired}
              hasWaitlist={event.allow_waitlist}
              isFullCapacity={event.participants.length === event.capacity}
            />
          </>
        }
        actionButtons={
          isUserOrganizer ? (
            <>
              <EditEventButton eventId={event.id} colorScheme="purple" rounded="full" />
              <DeleteEventButton event={event} borderRadius="full" colorScheme="purple" variant="outline" />
            </>
          ) : (
            <>
              <JoinEventModal user={user} event={event} />
              {user ? <SendMessageModal user={user} recipient={organizer} /> : null}
            </>
          )
        }
      />
      <DataDetailsContent
        imageFilepath={event.image_filepath}
        sideCardProps={{
          title: 'Summary',
          description: event.summary,
          mapData: event,
          items: [
            {
              icon: MdAccountCircle,
              content: (
                <Text>
                  Hosted by:{' '}
                  {match(event.author)
                    .with({ __typename: 'User' }, (author) => (
                      <Link
                        as={ReactRouterLink}
                        // @ts-expect-error
                        to={route.profile(author.id)}
                      >
                        <Text as="b">
                          {author.first_name} {author.last_name}
                        </Text>
                      </Link>
                    ))
                    .with({ __typename: 'Group' }, (group) => (
                      <Link
                        as={ReactRouterLink}
                        // @ts-expect-error
                        to={route.groupDetails(group.id)}
                      >
                        <Text as="b">{group.name}</Text>
                      </Link>
                    ))
                    .exhaustive()}
                </Text>
              ),
            },
            {
              icon: MdInfo,
              content: event.event_types.map((eventType) => <EventTypeTag key={eventType.id} eventType={eventType} />),
            },
            {
              icon: MdGroups,
              content: (
                <EventParticipants noIcon fontSize="md" capacity={event.capacity} participants={event.participants} />
              ),
            },
            {
              icon: MdCalendarToday,
              content: (
                <EventDateTime
                  noIcon
                  fontSize="md"
                  startDateTime={event.start_datetime}
                  endDateTime={event.end_datetime}
                />
              ),
            },
            {
              icon: MdLocationOn,
              content: <AddressInfo noIcon fontSize="md" location={getLocationFragmentData(event.location)} />,
            },
          ],
        }}
        tabsProps={[
          {
            title: 'Description',
            content: (
              <Box p={4} boxShadow="sm" bgColor="white">
                <Text whiteSpace="pre-line">{event.description}</Text>
              </Box>
            ),
          },
          {
            title: 'Participants',
            content: (
              <Flex justifyContent="space-between" flexWrap="wrap">
                {pipe(
                  Option.fromNullable(event.participants),
                  Option.filter(ReadonlyArray.isNonEmptyArray),
                  Option.map(
                    ReadonlyArray.filterMap((participant) =>
                      isUserOrganizer || participant.state === ParticipantState.Accepted
                        ? Option.some(
                            <EventParticipantItem
                              key={participant.user.id}
                              user={user}
                              event={event}
                              participant={participant}
                            />,
                          )
                        : Option.none(),
                    ),
                  ),
                  Option.filter(ReadonlyArray.isNonEmptyArray),
                  Option.getOrElse(() => <NoData description={`There are no participants for ${event.name} yet`} />),
                )}
              </Flex>
            ),
          },
          {
            title: 'Similar events',
            content: <SimilarEvents event={event} user={user} />,
          },
        ]}
      />
    </DataDetailsContainer>
  );
};

