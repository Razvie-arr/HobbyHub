import { useRef } from 'react';
import { useMutation } from '@apollo/client';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import { WithEvent } from '../../../../../shared/types';
import { CANCEL_EVENT } from '../../../mutations';

export const CancelEventButton = ({ event }: WithEvent) => {
  const noButtonRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [cancelEventRequest, cancelEventRequestState] = useMutation(CANCEL_EVENT, {
    refetchQueries: ['Event'],
    onQueryUpdated: async (observableQuery) => {
      await observableQuery.refetch();
    },
  });

  const handleCancel = async () => {
    await cancelEventRequest({
      variables: {
        eventId: event.id,
      },
    });
    toast({
      variant: 'left-accent',
      status: 'success',
      position: 'top-right',
      title: 'Event deleted!',
      description: 'Your event was cancelled successfully.',
      isClosable: true,
    });
  };

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="red"
        borderRadius="full"
        w="100%"
        isLoading={cancelEventRequestState.loading}
      >
        Cancel event
      </Button>

      <AlertDialog leastDestructiveRef={noButtonRef} isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>
            Cancel event{' '}
            <Text color="purple.500" display="inline">
              {event.name}
            </Text>
            ?
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>Are you sure you want to cancel this event?</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={noButtonRef} colorScheme="purple" mr={3} onClick={onClose} variant="outline">
              No
            </Button>
            <Button colorScheme="purple" onClick={handleCancel}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

