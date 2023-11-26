import {
  Button,
  Icon,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useBreakpoint,
  useDisclosure,
} from '@chakra-ui/react';
import { FaMapLocationDot } from 'react-icons/fa6';

import { DataMap } from './DataMap';
import { DataMapProps, MapData } from './types';

export const DataMapButton = <T extends MapData>(props: DataMapProps<T>) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const breakpoint = useBreakpoint();
  const iconOnly = breakpoint === 'base' || breakpoint === 'xs' || breakpoint === 'sm';
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
        position="fixed"
        bottom={{ base: '0', md: '8' }}
        right={{ base: '0', md: '8' }}
      >
        <Icon as={FaMapLocationDot} mr={iconOnly ? 0 : 2} />
        {iconOnly ? null : 'View on map'}
      </Button>
      <Modal onClose={onClose} size="6xl" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton position="absolute" top="3" right="16" zIndex="1" size="lg" />
          <DataMap {...props} />
        </ModalContent>
      </Modal>
    </>
  );
};

