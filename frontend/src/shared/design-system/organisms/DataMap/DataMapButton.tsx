import {
  Button,
  ButtonProps,
  Icon,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { FaMapLocationDot } from 'react-icons/fa6';

import { DataMap } from './DataMap';
import { MapDataArray } from './types';

interface InfoMapButtonProps extends ButtonProps {
  iconOnly?: boolean;
  mapInfos: MapDataArray;
}

export const DataMapButton = ({ mapInfos, iconOnly, ...buttonProps }: InfoMapButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
          <DataMap mapDataArray={mapInfos} />
        </ModalContent>
      </Modal>
    </>
  );
};

