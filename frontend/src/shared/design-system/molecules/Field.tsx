import { type ReactNode } from 'react';

import { FormControl, FormControlProps, FormErrorMessage, FormLabel } from '../atoms';

export interface FieldProps extends Omit<FormControlProps, 'label'> {
  id?: string;
  label?: ReactNode;
  isRequired?: boolean;
  error?: string;
  children: ReactNode;
}

export const Field = ({ id, label, isRequired, error, children, ...formControlProps }: FieldProps) => (
  <FormControl {...formControlProps} id={id} isRequired={isRequired} isInvalid={!!error}>
    {label ? <FormLabel>{label}</FormLabel> : null}
    {children}
    <FormErrorMessage>{error}</FormErrorMessage>
  </FormControl>
);
