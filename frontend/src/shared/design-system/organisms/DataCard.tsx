import { Card, CardBody, Heading, HStack, Image, Link, Stack, Text } from '@chakra-ui/react';
import { To, useNavigate } from 'react-router-dom';
import { match } from 'ts-pattern';

import {
  AddressInfo,
  Button,
  EventDateTime,
  EventParticipants,
  EventStatusTag,
  EventTypeTag,
} from 'src/shared/design-system';
import { EventData, GroupData, WithNullableAuthUser } from 'src/shared/types';

import { route } from '../../../route';
import { DEFAULT_EVENT_IMAGE_PATH } from '../../constants';
import { ReactRouterLink } from '../../navigation';

interface CommonProps extends WithNullableAuthUser {
  simplified?: boolean;
  maxFlexBasis?: string;
  detailRoute: To;
}

interface EventDataProps extends CommonProps {
  type: 'event';
  data: EventData;
}

interface GroupDataProps extends CommonProps {
  type: 'group';
  data: GroupData;
}

type DataCardProps = EventDataProps | GroupDataProps;

export const DataCard = ({ simplified, maxFlexBasis = '24%', detailRoute, user, ...other }: DataCardProps) => {
  const owner = match(other)
    .with({ type: 'event' }, ({ data }) =>
      match(data.author)
        .with({ __typename: 'User' }, (author) => author)
        .with({ __typename: 'Group' }, ({ admin }) => admin)
        .exhaustive(),
    )
    .with({ type: 'group' }, ({ data }) => data.admin)
    .exhaustive();
  const navigate = useNavigate();
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
                  hasWaitlist={other.data.allow_waitlist}
                  isFullCapacity={other.data.participants.length === other.data.capacity}
                  zIndex={1}
                />
              ) : null}
              <Image
                aspectRatio="16/9"
                objectFit="cover"
                src={other.data.image_filepath ?? DEFAULT_EVENT_IMAGE_PATH}
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
                {other.data.name}
              </Heading>
              <HStack>
                {other.data.event_types.map((eventType) => (
                  <EventTypeTag key={eventType.id} eventType={eventType} />
                ))}
              </HStack>
              <Text color="purple.600" as="b">
                {match(other)
                  .with(
                    { type: 'event' },
                    ({ data }) =>
                      `Hosted by: ${match(data.author)
                        .with({ __typename: 'User' }, ({ first_name, last_name }) => `${first_name} ${last_name}`)
                        .with({ __typename: 'Group' }, ({ name }) => name)
                        .exhaustive()}`,
                  )
                  .with({ type: 'group' }, ({ data }) => `Admin: ${data.admin.first_name} ${data.admin.last_name}`)
                  .exhaustive()}
              </Text>
              <Stack spacing="2">
                {other.type === 'event' ? (
                  <EventDateTime startDateTime={other.data.start_datetime} endDateTime={other.data.end_datetime} />
                ) : null}
                <AddressInfo location={other.data.location} />
                {other.type === 'event' ? (
                  <EventParticipants capacity={other.data.capacity} participants={other.data.participants} />
                ) : null}
              </Stack>
            </Stack>
            {user && user.id === owner.id ? (
              <Button
                borderRadius="full"
                size="sm"
                colorScheme="purple"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  const to = match(other)
                    .with({ type: 'event' }, ({ data }) => route.editEvent(data.id))
                    .with({ type: 'group' }, ({ data }) => route.editGroup(data.id))
                    .exhaustive();
                  navigate(to);
                }}
              >
                Edit event
              </Button>
            ) : null}
            {user && user.id !== owner.id ? (
              <Button
                borderRadius="full"
                size="sm"
                colorScheme="purple"
                isDisabled={
                  other.type === 'event' &&
                  other.data.participants.length === other.data.capacity &&
                  !other.data.allow_waitlist
                }
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                {other.type === 'event' &&
                other.data.participants.length === other.data.capacity &&
                other.data.allow_waitlist
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
