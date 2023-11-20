import { ReactNode } from 'react';
import { Editable, Stack, StackProps, Text } from '@chakra-ui/react';

import { AddressFilterInput } from './AddressFilterInput';

interface AddressFilterBarProps {
  preAddressText: ReactNode;
  address: google.maps.places.PlaceResult | null;
  onAddressSelected: (address: google.maps.places.PlaceResult) => Promise<void>;
}

export const AddressFilterBar = ({
  preAddressText,
  address,
  onAddressSelected,
  ...stackProps
}: AddressFilterBarProps & StackProps) => (
  <Stack {...stackProps} flexGrow={1} direction={{ base: 'column', md: 'row' }} spacing={2}>
    <Text as="b" fontSize="lg" lineHeight={1.9} display={{ base: 'none', md: 'initial' }}>
      {preAddressText}{' '}
    </Text>
    <Editable defaultValue={address ? address.formatted_address : ''} isPreviewFocusable={false} flex="1 1 auto">
      <AddressFilterInput onAddressSelected={onAddressSelected} />
    </Editable>
  </Stack>
);

