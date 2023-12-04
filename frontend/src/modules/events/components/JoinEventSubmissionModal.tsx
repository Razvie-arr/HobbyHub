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
import { HiOutlineRocketLaunch } from 'react-icons/hi2';

import { WithDisclosure } from 'src/shared/design-system';

export const JoinEventSubmissionModal = ({ disclosure }: WithDisclosure) => (
  <Modal isOpen={disclosure.isOpen} onClose={disclosure.onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalCloseButton />
      <ModalBody p="8">
        <VStack justifyContent="center">
          <Heading size="lg">Join request sent!</Heading>
          <Icon as={HiOutlineRocketLaunch} color="purple.500" boxSize="20" />
          <Text align="center" as="b">
            Thank you for your interest!
          </Text>
          <Text>
            Admin of the event received information about your application. You will receive an email notification right
            after their approval.
          </Text>
        </VStack>
      </ModalBody>
    </ModalContent>
  </Modal>
);

