import { Select, SelectProps } from '@chakra-ui/react';

import { FormField, type FormFieldBaseProps } from '../FormField';

export type SelectFieldProps = FormFieldBaseProps<SelectProps>;

export const SelectField = ({ id, name, label, formControlProps, ...selectProps }: SelectFieldProps) => (
  <FormField {...formControlProps} id={id} name={name} label={label} isRequired={selectProps.isRequired}>
    {(field) => <Select {...selectProps} {...field} />}
  </FormField>
);
