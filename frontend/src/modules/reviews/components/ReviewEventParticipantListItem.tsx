import { HStack, IconButton, Text } from '@chakra-ui/react';
import { MdAccountCircle } from 'react-icons/md';

import { WithAuthUser } from '../../../shared/types';
import { BlockUserButton } from '../../block';

import { AddReviewModalForm } from './AddReviewModalForm';

interface ReviewEventParticipantListItemProps extends WithAuthUser {
  eventId: number;
  participant: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
}

export const ReviewEventParticipantListItem = ({ eventId, user, participant }: ReviewEventParticipantListItemProps) => (
  <HStack
    justifyContent="space-between"
    bgColor="white"
    p={3}
    borderRadius={10}
    shadow="sm"
    flexBasis={{ base: '100%', md: '45%' }}
    mb="8"
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
      <Text>{`${participant.first_name} ${participant.last_name}`}</Text>
    </HStack>
    <HStack>
      <AddReviewModalForm eventId={eventId} user={user} participant={participant} />
      <BlockUserButton
        blockerId={user.id}
        blockedId={participant.id}
        blockedName={`${participant.first_name} ${participant.last_name}`}
        refetchQueries={['UnreviewedEventParticipants']}
      />
    </HStack>
  </HStack>
);

