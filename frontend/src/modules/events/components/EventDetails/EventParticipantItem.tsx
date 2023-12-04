import { Box, HStack, Icon, IconButton } from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa6';
import { MdAccountCircle } from 'react-icons/md';
import { match } from 'ts-pattern';

import { ParticipantState } from '../../../../gql/graphql';
import { route } from '../../../../route';
import { Link } from '../../../../shared/design-system';
import { ReactRouterLink } from '../../../../shared/navigation';
import { WithEvent, WithNullableAuthUser } from '../../../../shared/types';
import { SendMessageModal } from '../../../messages';
import { WithParticipant } from '../../types';

import { ResolveRequestModal } from './ResolveRequestModal';

export const EventParticipantItem = ({
  user,
  event,
  participant,
}: WithNullableAuthUser & WithEvent & WithParticipant) => (
  <HStack
    justifyContent="space-between"
    bgColor="white"
    p={3}
    flexBasis={{ base: '100%', md: '45%' }}
    borderRadius={10}
    mb={4}
    shadow="sm"
  >
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
      <Link
        as={ReactRouterLink}
        // @ts-expect-error
        to={route.profile(participant.user.id)}
      >
        {participant.user.first_name} {participant.user.last_name}
      </Link>
      {match(participant.state)
        .with(ParticipantState.Pending, () => <ResolveRequestModal event={event} participant={participant} />)
        .with(ParticipantState.Accepted, () => <Icon as={FaCheck} color="green.500" />)
        .exhaustive()}
    </HStack>
    {user ? (
      <Box>
        <SendMessageModal recipient={participant.user} user={user} />
      </Box>
    ) : null}
  </HStack>
);

