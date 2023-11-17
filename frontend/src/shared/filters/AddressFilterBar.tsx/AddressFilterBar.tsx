import { Editable, HStack, StackProps, Text } from '@chakra-ui/react';

import { AddressFilterInput } from './AddressFilterInput';

interface AddressFilterBarProps {
  address: google.maps.places.PlaceResult | null;
  onAddressSelected: (address: google.maps.places.PlaceResult) => Promise<void>;
}

export const AddressFilterBar = ({ address, onAddressSelected, ...stackProps }: AddressFilterBarProps & StackProps) => (
  <HStack alignItems="end" {...stackProps}>
    <Text as="b" fontSize="lg" flexBasis="6%" lineHeight={1.9}>
      Events in{' '}
    </Text>
    <Editable defaultValue={address ? address.formatted_address : ''} flex="1" isPreviewFocusable={false}>
      <AddressFilterInput onAddressSelected={onAddressSelected} />
    </Editable>
  </HStack>
);
