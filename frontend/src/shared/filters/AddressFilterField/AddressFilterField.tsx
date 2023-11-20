import { ReactNode } from 'react';
import { Editable, Stack, StackProps, Text } from '@chakra-ui/react';
import { FieldValues, useFormContext } from 'react-hook-form';

import { AddressFilterInput } from './AddressFilterInput';

type FieldValuesWithNullableAddress = FieldValues & { address: google.maps.places.PlaceResult | null };

interface AddressFilterFieldProps<V extends FieldValuesWithNullableAddress> {
  preAddressText: ReactNode;
  address: google.maps.places.PlaceResult | null;
  handleFilterSubmit: (values: V) => Promise<void>;
}

export const AddressFilterField = <V extends FieldValuesWithNullableAddress>({
  preAddressText,
  address,
  handleFilterSubmit,
  ...stackProps
}: AddressFilterFieldProps<V> & StackProps) => {
  const methods = useFormContext<V>();
  return (
    <Stack {...stackProps} flexGrow={1} direction={{ base: 'column', md: 'row' }} spacing={2}>
      <Text as="b" fontSize="lg" lineHeight={1.9} display={{ base: 'none', md: 'initial' }}>
        {preAddressText}{' '}
      </Text>
      <Editable defaultValue={address ? address.formatted_address : ''} isPreviewFocusable={false} flex="1 1 auto">
        <AddressFilterInput
          onAddressSelected={async (selectedAddress) => {
            const submit = methods.handleSubmit(async (values) => {
              await handleFilterSubmit({ ...values, address: selectedAddress });
            });
            await submit();
          }}
        />
      </Editable>
    </Stack>
  );
};

