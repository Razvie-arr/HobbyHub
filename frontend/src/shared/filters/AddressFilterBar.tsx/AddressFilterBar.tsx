import { Editable, HStack, Text } from '@chakra-ui/react';

import { ContentContainer } from '../../layout';
import { MainFiltersValues } from '../types';

import { AddressFilterInput } from './AddressFilterInput';

interface AddressFilterBarProps {
  defaultValues: MainFiltersValues;
  onAddressSelected: () => Promise<void>;
}

export const AddressFilterBar = ({ defaultValues, onAddressSelected }: AddressFilterBarProps) => (
  <ContentContainer>
    <HStack alignItems="end">
      <Text as="b" fontSize="xl" flexBasis="6%" lineHeight={1.9}>
        Events in{' '}
      </Text>
      <Editable
        defaultValue={defaultValues.address ? defaultValues.address.formatted_address : ''}
        flex="1"
        isPreviewFocusable={false}
      >
        <AddressFilterInput onAddressSelected={onAddressSelected} />
      </Editable>
    </HStack>
  </ContentContainer>
);

