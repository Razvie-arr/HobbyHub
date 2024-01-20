import { ReactNode } from 'react';
import {
  Heading,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { MdOutlineMailOutline } from 'react-icons/md';

import { WithDisclosure } from 'src/shared/design-system';

interface EmailVerificationModalProps extends WithDisclosure {
  text?: ReactNode;
}

export const EmailVerificationModal = ({ disclosure, text }: EmailVerificationModalProps) => (
  <Modal isOpen={disclosure.isOpen} onClose={disclosure.onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalCloseButton />
      <ModalBody p="8">
        <VStack justifyContent="center">
          <Heading size="lg">Check your email</Heading>
          <Icon as={MdOutlineMailOutline} color="purple.500" boxSize="20" />
          {text ? <Text align="center">{text}</Text> : null}
        </VStack>
      </ModalBody>
    </ModalContent>
  </Modal>
);

