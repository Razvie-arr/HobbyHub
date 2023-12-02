import { ReactNode } from 'react';
import {
  Button,
  ButtonProps,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { route } from '../../../route';
import { ReactRouterLink } from '../../navigation';
import { Link } from '../atoms';

interface AuthPromptModalProps {
  modalButtonLabel: ReactNode;
  modalButtonProps?: ButtonProps;
}

export const AuthPromptModal = ({ modalButtonLabel, modalButtonProps = {} }: AuthPromptModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        onClick={(event) => {
          event.preventDefault();
          onOpen();
        }}
        {...modalButtonProps}
      >
        {modalButtonLabel}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>HobbyHub</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="8">
            <Stack spacing={4}>
              <Text as="b">To unlock full access to HobbyHub features, please create an account.</Text>
              <Center>
                <Stack spacing={4}>
                  <Button as={ReactRouterLink} to={route.signup()} borderRadius="full" colorScheme="purple">
                    Sign up
                  </Button>
                  <Text>
                    Already have an account?{' '}
                    <Link
                      as={ReactRouterLink}
                      // @ts-expect-error
                      to={route.signin()}
                    >
                      Sign in
                    </Link>
                  </Text>
                </Stack>
              </Center>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

