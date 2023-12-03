import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { match } from 'ts-pattern';

import { User } from '../../../gql/graphql';
import { ContentContainer } from '../../../shared/layout';
import { WithAuthUser, WithEvent } from '../../../shared/types';

import { ReviewEventMember } from './ReviewEventMember';

interface ReviewEventMemberProps extends WithAuthUser, WithEvent {
  participants: Array<Pick<User, 'id' | 'first_name' | 'last_name' | 'email'>>;
}

export const ReviewEventMembers = ({ event, user, participants }: ReviewEventMemberProps) => {
  const organizer = match(event.author)
    .with({ __typename: 'User' }, (author) => author)
    .with({ __typename: 'Group' }, ({ admin }) => admin)
    .exhaustive();

  const isUserOrganizer = user && user.id === organizer.id;

  return (
    <ContentContainer>
      <Stack mt={12} spacing={6}>
        <Heading>
          Had a blast at{' '}
          <Text as="span" color="purple.500">
            {event.name}
          </Text>
          ?
        </Heading>
        <Text>
          Let the {isUserOrganizer ? 'participants' : 'organizer'} know! Share your feedback and help them make future
          events even more incredible!
        </Text>
        <Box display="flex">
          {participants.map((member) => (
            <ReviewEventMember key={member.id} eventId={event.id} user={user} member={member} />
          ))}
        </Box>
      </Stack>
    </ContentContainer>
  );
};

