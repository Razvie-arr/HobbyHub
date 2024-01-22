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
  ButtonGroup,
  ButtonProps,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import { UNBLOCK_USER } from './mutations';

interface UnblockUserButtonProps extends ButtonProps {
  blockerId: number;
  blockedId: number;
  blockedName: string;
  refetchQueries?: string[];
}

export const UnblockUserButton = ({
  blockerId,
  blockedId,
  blockedName,
  refetchQueries,
  ...buttonProps
}: UnblockUserButtonProps) => {
  const noButtonRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [blockUserRequest, blockUserRequestState] = useMutation(UNBLOCK_USER, {
    refetchQueries,
    onQueryUpdated: async (observableQuery) => {
      await observableQuery.refetch();
    },
  });

  const handleBlock = async () => {
    await blockUserRequest({
      variables: {
        blockerId,
        blockedId,
      },
    });
    onClose();
    toast({
      variant: 'left-accent',
      status: 'success',
      position: 'top-right',
      title: 'User deleted!',
      description: `You have unblocked ${blockedName} successfully.`,
      isClosable: true,
    });
  };

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="red"
        variant="outline"
        isLoading={blockUserRequestState.loading}
        {...buttonProps}
      >
        Unblock
      </Button>

      <AlertDialog leastDestructiveRef={noButtonRef} isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>
            Unblock user{' '}
            <Text color="purple.500" display="inline">
              {blockedName}
            </Text>
            ?
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>By unblocking, you allow this user to join your events.</AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup isDisabled={blockUserRequestState.loading} justifyContent="space-between" w="100%">
              <Button colorScheme="green" onClick={handleBlock} flexBasis="50%">
                Unblock
              </Button>
              <Button ref={noButtonRef} colorScheme="purple" mr={3} onClick={onClose} variant="outline" flexBasis="50%">
                Cancel
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

