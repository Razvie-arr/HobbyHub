import { Card, CardBody, Heading, HStack, Image, Link, Stack, Text } from '@chakra-ui/react';
import { To } from 'react-router-dom';
import { match } from 'ts-pattern';

import {
  AddressInfo,
  Button,
  EventDateTime,
  EventParticipants,
  EventStatusTag,
  EventTypeTag,
} from 'src/shared/design-system';
import { EventProps, GroupProps, WithAuthUser } from 'src/shared/types';

import { DEFAULT_EVENT_IMAGE_PATH } from '../../constants';
import { ReactRouterLink } from '../../navigation';

interface CommonProps {
  simplified?: boolean;
  maxFlexBasis?: string;
  detailRoute: To;
  user: WithAuthUser['user'] | null;
}

interface EventInfoCard extends CommonProps, EventProps {
  type: 'event';
}

interface GroupInfoCard extends CommonProps, GroupProps {
  type: 'group';
}

type InfoCardProps = EventInfoCard | GroupInfoCard;

export const InfoCard = ({ simplified, maxFlexBasis = '24%', detailRoute, user, ...other }: InfoCardProps) => {
  const author = match(other)
    .with({ type: 'event' }, (event) => event.author)
    .with({ type: 'group' }, (group) => group.admin)
    .exhaustive();
  return (
    <Card
      flexBasis={{ '2xl': maxFlexBasis, lg: '32%', md: '48%' }}
      backgroundColor="white"
      mb={simplified ? '0' : '12'}
      shadow="sm"
      role="group"
      _hover={{ shadow: 'md' }}
      transition="0.1s ease-in-out"
    >
      <Link to={detailRoute} as={ReactRouterLink} _groupHover={{ textDecoration: 'none' }} h="100%">
        <CardBody p="0" display="flex" flexDirection="column" h="100%">
          {simplified ? null : (
            <>
              {other.type === 'event' ? (
                <EventStatusTag
                  hasWaitlist={other.allow_waitlist}
                  isFullCapacity={other.participants.length === other.capacity}
                  zIndex={1}
                />
              ) : null}
              <Image
                aspectRatio="16/9"
                objectFit="cover"
                src={other.image_filepath ?? DEFAULT_EVENT_IMAGE_PATH}
                borderTopRadius="base"
                _groupHover={{ opacity: '0.7' }}
                transition="0.1s ease-in-out"
              />
            </>
          )}
          <Stack justifyContent="space-between" flex="1" spacing="2" p="4">
            <Stack>
              <Heading
                size="md"
                noOfLines={3}
                lineHeight="initial"
                _groupHover={{ textDecoration: 'underline' }}
                transition="0.1s ease-in-out"
              >
                {other.name}
              </Heading>
              <HStack>
                {other.event_types.map((eventType) => (
                  <EventTypeTag key={eventType.id} eventType={eventType} />
                ))}
              </HStack>
              <Text color="purple.600" as="b">
                {match(other)
                  .with(
                    { type: 'event' },
                    (event) =>
                      `Hosted by: ${
                        event.author ? `${event.author.first_name} ${event.author.last_name}` : event.group?.name
                      }`,
                  )
                  .with({ type: 'group' }, (group) => `Admin: ${group.admin.first_name} ${group.admin.last_name}`)
                  .exhaustive()}
              </Text>
              <Stack spacing="2">
                {other.type === 'event' ? (
                  <EventDateTime startDateTime={other.start_datetime} endDateTime={other.end_datetime} />
                ) : null}
                <AddressInfo location={other.location} />
                {other.type === 'event' ? (
                  <EventParticipants capacity={other.capacity} participants={other.participants} />
                ) : null}
              </Stack>
            </Stack>
            {user && user.id === author?.id ? (
              <Button
                borderRadius="full"
                size="sm"
                colorScheme="purple"
                // as={ReactRouterLink}
                variant="outline"
                // to={route.editEvent(event.id)}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Edit event
              </Button>
            ) : null}
            {user && user.id !== author?.id ? (
              <Button
                borderRadius="full"
                size="sm"
                colorScheme="purple"
                isDisabled={
                  other.type === 'event' && other.participants.length === other.capacity && !other.allow_waitlist
                }
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                {other.type === 'event' && other.participants.length === other.capacity && other.allow_waitlist
                  ? 'Join Waitlist'
                  : 'Join'}
              </Button>
            ) : null}
          </Stack>
        </CardBody>
      </Link>
    </Card>
  );
};

