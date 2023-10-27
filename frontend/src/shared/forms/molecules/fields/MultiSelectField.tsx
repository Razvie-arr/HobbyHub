import { Props, Select } from 'chakra-react-select';

import { FormField, type FormFieldBaseProps } from '../FormField';

export type MultiSelectFieldProps = FormFieldBaseProps<Props>;

export const MultiSelectField = ({ id, name, label, formControlProps, ...selectProps }: MultiSelectFieldProps) => (
  <FormField {...formControlProps} id={id} name={name} label={label} isRequired={selectProps.isRequired}>
    {(field) => <Select {...selectProps} {...field} />}
  </FormField>
);

