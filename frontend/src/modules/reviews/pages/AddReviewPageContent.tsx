import { Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { match } from 'ts-pattern';

import { User } from '../../../gql/graphql';
import { ContentContainer } from '../../../shared/layout';
import { WithAuthUser, WithEvent } from '../../../shared/types';
import { MaxRatingAllParticipants, ReviewEventParticipantListItem } from '../components';

interface AddReviewPageContentProps extends WithAuthUser, WithEvent {
  participants: Array<Pick<User, 'id' | 'first_name' | 'last_name' | 'email'>>;
}

export const AddReviewPageContent = ({ event, user, participants }: AddReviewPageContentProps) => {
  const organizer = match(event.author)
    .with({ __typename: 'User' }, (author) => author)
    .with({ __typename: 'Group' }, ({ admin }) => admin)
    .exhaustive();

  const isUserOrganizer = user.id === organizer.id;

  return (
    <ContentContainer>
      <Stack mt={12} spacing="16">
        <Stack>
          <Heading as="h1">
            Had a blast at{' '}
            <Text color="purple.500" display="inline">
              {event.name}
            </Text>
            ?
          </Heading>
          <Text fontSize="2xl">
            Let the {isUserOrganizer ? 'participants' : 'organizer'} know! Share your feedback and help them make future
            events even more incredible!
          </Text>
        </Stack>
        {isUserOrganizer ? <MaxRatingAllParticipants event={event} user={user} /> : null}
        <Flex flexWrap="wrap" columnGap="4">
          {participants.map((participant) => (
            <ReviewEventParticipantListItem
              key={participant.id}
              eventId={event.id}
              user={user}
              participant={participant}
            />
          ))}
        </Flex>
      </Stack>
    </ContentContainer>
  );
};

