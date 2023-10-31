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

import { WithNonEmptyEvents } from '../../types';

import { EventsMap } from './EventsMap';

interface EventsMapButtonProps extends ButtonProps, WithNonEmptyEvents {
  iconOnly?: boolean;
  forceRender?: boolean;
}

export const EventsMapButton = ({ events, forceRender, iconOnly, ...buttonProps }: EventsMapButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const breakpoint = useBreakpoint();

  if (!forceRender && (breakpoint === 'base' || breakpoint === 'xs' || breakpoint === 'sm')) {
    return null;
  }
  return (
    <>
      <Button
        onClick={onOpen}
        m={4}
        colorScheme="purple"
        borderRadius="full"
        size="lg"
        zIndex="1"
        borderWidth="1px"
        borderColor="purple.100"
        {...buttonProps}
      >
        <Icon as={FaMapLocationDot} mr={iconOnly ? 0 : 2} />
        {iconOnly ? null : 'View on map'}
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

