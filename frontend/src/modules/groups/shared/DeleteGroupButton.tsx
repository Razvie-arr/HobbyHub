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
import { WithGroup } from '../../../shared/types';
import { DELETE_GROUP } from '../mutations';

export const DeleteGroupButton = ({ group, ...buttonProps }: WithGroup & ButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const [deleteGroupRequest, deleteGroupRequestState] = useMutation(DELETE_GROUP);

  const navigate = useNavigate();
  const toast = useToast();

  const handleDelete = async () => {
    await deleteGroupRequest({
      variables: {
        groupId: group.id,
        locationId: group.location.id,
      },
    });
    toast({
      variant: 'left-accent',
      status: 'success',
      position: 'top-right',
      title: 'Group deleted!',
      description: 'Your group was deleted successfully.',
      isClosable: true,
    });
    navigate(route.home());
  };

  return (
    <>
      <Button {...buttonProps} onClick={onOpen} isLoading={deleteGroupRequestState.loading}>
        Delete
      </Button>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete group
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

