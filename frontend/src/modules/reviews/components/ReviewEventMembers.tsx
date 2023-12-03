import { Stack } from '@chakra-ui/react';

import { User } from '../../../gql/graphql';
import { ContentContainer } from '../../../shared/layout';
import { WithAuthUser } from '../../../shared/types';

import { ReviewEventMember } from './ReviewEventMember';

interface ReviewEventMemberProps extends WithAuthUser {
  eventId: number;
  participants: Array<Pick<User, 'id' | 'first_name' | 'last_name' | 'email'>>;
}

export const ReviewEventMembers = ({ eventId, user, participants }: ReviewEventMemberProps) => (
  <ContentContainer maxW="lg">
    <Stack mt={12} spacing={6}>
      {participants.map((member) => (
        <ReviewEventMember key={member.id} eventId={eventId} user={user} member={member} />
      ))}
    </Stack>
  </ContentContainer>
);

