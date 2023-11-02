import {
  ButtonGroup,
  EditableInput,
  EditablePreview,
  Flex,
  HStack,
  Icon,
  IconButton,
  useEditableContext,
  useEditableControls,
} from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import { MdCheck, MdClose, MdEdit } from 'react-icons/md';

import { AddressInput } from '../../forms';

interface AddressFilterInputProps {
  onAddressSelected: () => Promise<void>;
}

export const AddressFilterInput = ({ onAddressSelected }: AddressFilterInputProps) => {
  const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls();
  const { getInputProps } = useEditableContext();
  const inputProps = getInputProps();
  return (
    <HStack>
      <EditablePreview fontSize="xl" color="purple.500" />
      <Controller
        name="address"
        render={({ field }) => (
          <AddressInput
            as={EditableInput}
            onFocus={(event) => {
              event.target.select();
            }}
            onPlaceSelected={async (place) => {
              if (inputProps.onChange && place) {
                // @ts-expect-error
                inputProps.onChange({ currentTarget: { value: place.formatted_address } });
              }
              field.onChange(place);
              await onAddressSelected();
            }}
          />
        )}
      />
      {isEditing ? (
        <ButtonGroup justifyContent="center" size="sm">
          <IconButton
            aria-label="Submit location"
            colorScheme="purple"
            icon={<Icon as={MdCheck} />}
            {...getSubmitButtonProps()}
          />
          <IconButton
            aria-label="Cancel location"
            colorScheme="purple"
            icon={<Icon as={MdClose} />}
            {...getCancelButtonProps()}
          />
        </ButtonGroup>
      ) : (
        <Flex justifyContent="center">
          <IconButton
            aria-label="Edit location"
            size="sm"
            colorScheme="purple"
            icon={<Icon as={MdEdit} />}
            {...getEditButtonProps()}
          />
        </Flex>
      )}
    </HStack>
  );
};

