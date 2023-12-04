import { useMutation } from '@apollo/client';
import { Button, Flex, Heading, HStack, Stack, Text, useToast } from '@chakra-ui/react';
import { match } from 'ts-pattern';

import { User } from '../../../gql/graphql';
import { ContentContainer } from '../../../shared/layout';
import { WithAuthUser, WithEvent } from '../../../shared/types';
import { MAX_RATING_ALL_PARTICIPANTS } from '../mutations';

import { ReviewEventMember } from './ReviewEventMember';

interface ReviewEventMemberProps extends WithAuthUser, WithEvent {
  participants: Array<Pick<User, 'id' | 'first_name' | 'last_name' | 'email'>>;
}

export const ReviewEventMembers = ({ event, user, participants }: ReviewEventMemberProps) => {
  const toast = useToast();

  const [maxRatingAllParticipantsRequest] = useMutation(MAX_RATING_ALL_PARTICIPANTS, {
    refetchQueries: ['UnreviewedEventParticipants'],
    onQueryUpdated: async (observableQuery) => {
      await observableQuery.refetch();
    },
    onCompleted: () => {
      toast({
        variant: 'left-accent',
        status: 'success',
        position: 'top-right',
        title: 'Successfully sent highest rating to all the participants!',
        description: 'All the participants received the highest rating from you.',
        isClosable: true,
      });
    },
    onError: () => {},
  });

  const organizer = match(event.author)
    .with({ __typename: 'User' }, (author) => author)
    .with({ __typename: 'Group' }, ({ admin }) => admin)
    .exhaustive();

  const isUserOrganizer = user.id === organizer.id;

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
        <HStack>
          <Text as="b">Were you amazed by all the participants? Give them all the highest rating!</Text>
          {isUserOrganizer ? (
            <Button
              colorScheme="purple"
              size="sm"
              onClick={async () => {
                await maxRatingAllParticipantsRequest({
                  variables: {
                    adminId: user.id,
                    eventId: event.id,
                  },
                });
              }}
            >
              WOW!
            </Button>
          ) : null}
        </HStack>
        <Flex flexWrap="wrap" columnGap="4">
          {participants.map((member) => (
            <ReviewEventMember key={member.id} eventId={event.id} user={user} member={member} />
          ))}
        </Flex>
      </Stack>
    </ContentContainer>
  );
};

