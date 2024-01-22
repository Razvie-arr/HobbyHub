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

import { BLOCK_USER } from './mutations';

interface BlockUserButtonProps extends ButtonProps {
  blockerId: number;
  blockedId: number;
  blockedName: string;
  refetchQueries?: string[];
}

export const BlockUserButton = ({
  blockerId,
  blockedId,
  blockedName,
  refetchQueries,
  ...buttonProps
}: BlockUserButtonProps) => {
  const noButtonRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [blockUserRequest, blockUserRequestState] = useMutation(BLOCK_USER, {
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
      title: 'User blocked!',
      description: `You have blocked ${blockedName} successfully.`,
      isClosable: true,
    });
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="red" isLoading={blockUserRequestState.loading} {...buttonProps}>
        Block
      </Button>

      <AlertDialog leastDestructiveRef={noButtonRef} isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>
            Block user{' '}
            <Text color="purple.500" display="inline">
              {blockedName}
            </Text>
            ?
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>By blocking, you prevent this user from joining your events.</AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup isDisabled={blockUserRequestState.loading} justifyContent="space-between" w="100%">
              <Button colorScheme="red" onClick={handleBlock} flexBasis="50%">
                Block
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

