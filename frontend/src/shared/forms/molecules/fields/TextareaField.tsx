import { Textarea, type TextareaProps } from 'src/shared/design-system';

import { FormField, type FormFieldBaseProps } from '../FormField';

export type TextareaFieldProps = FormFieldBaseProps<TextareaProps>;

export const TextareaField = ({ id, name, label, ...textareaProps }: TextareaFieldProps) => (
  <FormField id={id} name={name} label={label} isRequired={textareaProps.isRequired}>
    {(field) => <Textarea {...textareaProps} {...field} />}
  </FormField>
);

