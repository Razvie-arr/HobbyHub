import { Checkbox, CheckboxProps, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { useController } from 'react-hook-form';

import { FormField, type FormFieldBaseProps } from '../FormField';

export type CheckboxFieldProps = FormFieldBaseProps<CheckboxProps>;

export const CheckboxField = ({ id, name, label, formControlProps, ...checkboxProps }: CheckboxFieldProps) => (
  <FormField {...formControlProps} id={id} name={name} label={label} isRequired={checkboxProps.isRequired}>
    {(field) => <Checkbox {...checkboxProps} {...field} />}
  </FormField>
);

export const InlineCheckboxField = ({ id, name, label, formControlProps, ...checkboxProps }: CheckboxFieldProps) => {
  const controller = useController({ name });

  const error = controller?.fieldState?.error?.message;

  return (
    <FormControl {...formControlProps} id={id} isRequired={checkboxProps.isRequired} isInvalid={!!error}>
      <Checkbox {...checkboxProps} {...controller.field}>
        {label}
      </Checkbox>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

