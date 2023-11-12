import { Editable, HStack, Text } from '@chakra-ui/react';

import { ContentContainer } from '../../layout';

import { AddressFilterInput } from './AddressFilterInput';

interface AddressFilterBarProps {
  address: google.maps.places.PlaceResult | null;
  onAddressSelected: () => Promise<void>;
}

export const AddressFilterBar = ({ address, onAddressSelected }: AddressFilterBarProps) => (
  <ContentContainer>
    <HStack alignItems="end">
      <Text as="b" fontSize="xl" flexBasis="6%" lineHeight={1.9}>
        Events in{' '}
      </Text>
      <Editable defaultValue={address ? address.formatted_address : ''} flex="1" isPreviewFocusable={false}>
        <AddressFilterInput onAddressSelected={onAddressSelected} />
      </Editable>
    </HStack>
  </ContentContainer>
);

