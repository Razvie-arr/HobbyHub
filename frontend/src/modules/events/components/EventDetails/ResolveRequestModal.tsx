import { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import { WithEvent } from '../../../../shared/types';
import { RESOLVE_EVENT_REGISTRATION } from '../../mutations';
import { WithParticipant } from '../../types';

export const ResolveRequestModal = ({ event, participant }: WithEvent & WithParticipant) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [accept, setAccept] = useState<boolean | null>(false);

  const [resolveEventRegistration, resolveEventRegistrationRequestState] = useMutation(RESOLVE_EVENT_REGISTRATION, {
    refetchQueries: ['Event'],
    onQueryUpdated: async (observableQuery) => {
      await observableQuery.refetch();
    },
  });

  const createSubmitHandler = (parameters: { accept: boolean }) => async () => {
    setAccept(accept);
    await resolveEventRegistration({
      variables: {
        resolve: {
          event_id: event.id,
          event_name: event.name,
          resolution: parameters.accept,
          user_email: participant.user.email,
          user_id: participant.user.id,
        },
      },
    });
    onClose();
    if (parameters.accept) {
      toast({
        variant: 'left-accent',
        status: 'success',
        position: 'top-right',
        title: 'Join request accepted!',
        description: `${participant.user.first_name} ${participant.user.first_name} is now part of ${event.name}!`,
        isClosable: true,
      });
    } else {
      toast({
        variant: 'left-accent',
        status: 'success',
        position: 'top-right',
        title: 'Join request declined!',
        description: `You have declined the join request from ${participant.user.first_name} ${participant.user.first_name}.`,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button
        colorScheme="orange"
        size="xs"
        onClick={(buttonEvent) => {
          buttonEvent.preventDefault();
          onOpen();
        }}
      >
        Pending
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Accept join request from {`${participant.user.first_name} ${participant.user.first_name}`}?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="8">
            <Text>{participant.text}</Text>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup
              isDisabled={resolveEventRegistrationRequestState.loading}
              justifyContent="space-between"
              w="100%"
            >
              <Button
                colorScheme="green"
                mr={4}
                onClick={createSubmitHandler({ accept: true })}
                flexBasis="50%"
                isLoading={accept === true && resolveEventRegistrationRequestState.loading}
              >
                Accept
              </Button>
              <Button
                colorScheme="red"
                flexBasis="50%"
                onClick={createSubmitHandler({ accept: false })}
                isLoading={accept === false && resolveEventRegistrationRequestState.loading}
              >
                Decline
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

