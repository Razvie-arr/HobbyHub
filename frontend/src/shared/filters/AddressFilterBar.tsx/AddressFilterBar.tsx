import { Editable, Stack, StackProps, Text } from '@chakra-ui/react';

import { AddressFilterInput } from './AddressFilterInput';

interface AddressFilterBarProps {
  address: google.maps.places.PlaceResult | null;
  onAddressSelected: (address: google.maps.places.PlaceResult) => Promise<void>;
}

export const AddressFilterBar = ({ address, onAddressSelected, ...stackProps }: AddressFilterBarProps & StackProps) => (
  <Stack {...stackProps} flexGrow={1} direction={{ base: 'column', md: 'row' }}>
    <Text as="b" fontSize="lg" lineHeight={1.9} flexBasis={{ md: '82px' }} display={{ base: 'none', lg: 'initial' }}>
      Events in{' '}
    </Text>
    <Editable defaultValue={address ? address.formatted_address : ''} isPreviewFocusable={false} flex="1 1 auto">
      <AddressFilterInput onAddressSelected={onAddressSelected} />
    </Editable>
  </Stack>
);

