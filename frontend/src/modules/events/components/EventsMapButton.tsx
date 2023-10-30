import {
  Button,
  ButtonProps,
  Icon,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useBreakpoint,
  useDisclosure,
} from '@chakra-ui/react';
import { FaMapLocationDot } from 'react-icons/fa6';

import { WithEvents } from '../types';

import { EventsMap } from './EventsMap';

export const EventsMapButton = ({ events, ...buttonProps }: ButtonProps & WithEvents) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const breakpoint = useBreakpoint();

  if (breakpoint === 'base' || breakpoint === 'xs' || breakpoint === 'sm') {
    return null;
  }
  return (
    <>
      <Button
        onClick={onOpen}
        m={4}
        {...buttonProps}
        colorScheme="purple"
        borderRadius="full"
        size="lg"
        zIndex="1"
        borderWidth="1px"
        borderColor="purple.100"
      >
        <Icon as={FaMapLocationDot} mr="2" />
        View on map
      </Button>
      <Modal onClose={onClose} size="6xl" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton position="absolute" top="3" right="16" zIndex="1" size="lg" />
          <EventsMap events={events} />
        </ModalContent>
      </Modal>
    </>
  );
};

