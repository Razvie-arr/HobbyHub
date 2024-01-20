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

import { route } from '../../../../route';
import { getLocationFragmentData, WithEvent } from '../../../../shared/types';
import { DELETE_EVENT } from '../../mutations';

export const DeleteEventButton = ({ event, ...buttonProps }: WithEvent & ButtonProps) => {
  const cancelButtonRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [deleteEventRequest, deleteEventRequestState] = useMutation(DELETE_EVENT);

  const navigate = useNavigate();

  const handleDelete = async () => {
    await deleteEventRequest({
      variables: {
        eventId: event.id,
        locationId: getLocationFragmentData(event.location).id,
      },
    });
    toast({
      variant: 'left-accent',
      status: 'success',
      position: 'top-right',
      title: 'Event deleted!',
      description: 'Your event was deleted successfully.',
      isClosable: true,
    });
    navigate(route.events());
  };

  return (
    <>
      <Button {...buttonProps} onClick={onOpen} isLoading={deleteEventRequestState.loading}>
        Delete
      </Button>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelButtonRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete event
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="purple" variant="outline" ref={cancelButtonRef} onClick={onClose}>
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

