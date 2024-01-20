import { useMutation } from '@apollo/client';
import { IconButton, Text, useToast, VStack } from '@chakra-ui/react';
import { IoStar } from 'react-icons/io5';

import { WithAuthUser, WithEvent } from '../../../shared/types';
import { MAX_RATING_ALL_PARTICIPANTS } from '../mutations';

export const MaxRatingAllParticipants = ({ event, user }: WithEvent & WithAuthUser) => {
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

  return (
    <VStack alignSelf="center" spacing={8}>
      <IconButton
        aria-label="wow"
        colorScheme="whiteAlpha"
        icon={<IoStar size="6em" color="#FFC746" fill="#FFC746" />}
        isRound
        boxSize={36}
        boxShadow="base"
        onClick={async () => {
          await maxRatingAllParticipantsRequest({
            variables: {
              adminId: user.id,
              eventId: event.id,
            },
          });
        }}
      />
      <Text as="b">
        Were you amazed by all the participants? Give them all the highest rating by clicking the STAR button above! 🌟
      </Text>
    </VStack>
  );
};

