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

export const EmailVerificationModal = ({ disclosure }: WithDisclosure) => (
  <Modal isOpen={disclosure.isOpen} onClose={disclosure.onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalCloseButton />
      <ModalBody p="8">
        <VStack justifyContent="center">
          <Heading size="lg">Check your email</Heading>
          <Icon as={MdOutlineMailOutline} color="purple.500" boxSize="20" />
          <Text align="center">To complete the account verification process, please check your email inbox.</Text>
        </VStack>
      </ModalBody>
    </ModalContent>
  </Modal>
);
