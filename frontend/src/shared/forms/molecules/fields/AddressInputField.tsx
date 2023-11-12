import { FormField, type FormFieldBaseProps } from '../FormField';
import { AddressInput, AddressInputProps } from '../inputs';

export type AddressInputFieldProps = FormFieldBaseProps<Omit<AddressInputProps, 'onPlaceSelected'>>;

export const AddressInputField = ({ id, name, label, formControlProps, ...inputProps }: AddressInputFieldProps) => (
  <FormField {...formControlProps} id={id} name={name} label={label} isRequired={inputProps.isRequired}>
    {({ onChange, ref, value, ...field }) => (
      <AddressInput
        {...inputProps}
        {...field}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
          }
        }}
        onPlaceSelected={(place) => {
          onChange(place);
        }}
      />
    )}
  </FormField>
);
