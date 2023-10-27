import { type ReactNode } from 'react';
import { type ControllerRenderProps, useController } from 'react-hook-form';

import { Field, type FieldProps, FormControlProps } from 'src/shared/design-system';

type BaseProps = Pick<FieldProps, 'id' | 'label' | 'isRequired'> & {
  name: string;
};

export type FormFieldBaseProps<TInputProps> = BaseProps &
  Omit<TInputProps, keyof BaseProps> & { formControlProps?: FormControlProps };

export interface FormFieldProps extends BaseProps, Omit<FormControlProps, 'label' | 'children'> {
  children: (controller: ControllerRenderProps) => ReactNode;
}

export function FormField({ name, children, ...restProps }: FormFieldProps) {
  const controller = useController({ name });

  const error = controller?.fieldState?.error?.message;

  return (
    <Field error={error} {...restProps}>
      {children(controller.field)}
    </Field>
  );
}

