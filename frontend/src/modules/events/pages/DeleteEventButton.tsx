import { useRef } from 'react';
import { useMutation } from '@apollo/client';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonProps,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { route } from '../../../route';
import { DELETE_EVENT } from '../mutations';
import { WithEvent } from '../types';

export const DeleteEventButton = ({ event, ...buttonProps }: WithEvent & ButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const [deleteEventRequest, deleteEventRequestState] = useMutation(DELETE_EVENT);

  const navigate = useNavigate();
  const toast = useToast();

  const handleDelete = async () => {
    await deleteEventRequest({
      variables: {
        eventId: event.id,
        locationId: event.location.id,
      },
    });
    toast({
      variant: 'left-accent',
      status: 'success',
      position: 'top-right',
      title: 'Event deleted!',
      description: 'Your event was deleted successfully.',
    });
    navigate(route.home());
  };

  return (
    <>
      <Button {...buttonProps} onClick={onOpen} isLoading={deleteEventRequestState.loading}>
        Delete
      </Button>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete event
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="purple" variant="outline" ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="purple" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

