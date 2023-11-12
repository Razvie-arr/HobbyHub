import { Option, pipe } from 'effect';
import { useFormContext } from 'react-hook-form';

import { getAddressComponents } from '../../utils/googleMaps';
import { Field } from '../design-system';

import { AddressInput, InputField } from './molecules';

export const AddressFormFields = () => {
  const { setValue } = useFormContext();
  return (
    <>
      <Field label="Search address">
        <AddressInput
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
            }
          }}
          onPlaceSelected={(places) => {
            const addressComponents = pipe(
              Option.fromNullable(places?.address_components),
              Option.flatMap(getAddressComponents),
              Option.getOrElse(() => null),
            );
            if (addressComponents) {
              const { country, city, cityFallback, streetName, streetNumber } = addressComponents;
              setValue('streetName', streetName?.short_name ?? '');
              setValue('streetNumber', streetNumber?.short_name ?? '');
              setValue('city', city?.short_name ?? cityFallback?.short_name ?? '');
              setValue('country', country?.long_name ?? '');
            }
          }}
        />
      </Field>
      <InputField name="streetName" label="Street name" isRequired />
      <InputField name="streetNumber" label="Street number" isRequired />
      <InputField name="city" label="City" isRequired />
      <InputField name="country" label="Country" isRequired />
    </>
  );
};
