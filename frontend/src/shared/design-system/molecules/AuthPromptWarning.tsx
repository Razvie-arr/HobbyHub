import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';

import { route } from '../../../route';
import { ReactRouterLink, RouterLink } from '../../navigation';

interface AuthPromptWarningProps {
  text?: string;
}

export const AuthPromptWarning = ({
  text = 'To unlock full access to HobbyHub features, please create an account.',
}: AuthPromptWarningProps) => (
  <Modal isOpen onClose={() => {}}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>HobbyHub</ModalHeader>
      <ModalBody pb="8">
        <Stack spacing={4}>
          <Text as="b">{text}</Text>
          <Center>
            <Stack spacing={4}>
              <Button as={ReactRouterLink} to={route.signUp()} borderRadius="full" colorScheme="purple">
                Sign up
              </Button>
              <Text>
                Already have an account? <RouterLink to={route.signIn()}>Sign in</RouterLink>
              </Text>
            </Stack>
          </Center>
        </Stack>
      </ModalBody>
    </ModalContent>
  </Modal>
);

