import { Input, InputProps } from '@chakra-ui/react';
import { ReactGoogleAutocompleteProps, usePlacesWidget } from 'react-google-autocomplete';

export interface AddressInputProps extends InputProps {
  onPlaceSelected: NonNullable<ReactGoogleAutocompleteProps['onPlaceSelected']>;
}

export const AddressInput = ({ onPlaceSelected, ...inputProps }: AddressInputProps) => {
  const { ref } = usePlacesWidget({
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    options: {
      types: [],
      componentRestrictions: { country: 'cz' },
    },
    onPlaceSelected,
  });
  return <Input {...inputProps} ref={ref} />;
};

