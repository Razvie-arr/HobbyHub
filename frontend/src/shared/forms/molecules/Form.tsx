import { type ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import { type FieldValues, FormProvider, type SubmitHandler, useForm, type UseFormProps } from 'react-hook-form';

export type FormProps<TFieldValues extends FieldValues = FieldValues> = UseFormProps<TFieldValues> & {
  children: ReactNode;
  onSubmit: SubmitHandler<TFieldValues>;
  noValidate?: boolean;
};

export const Form = <TFieldValues extends FieldValues = FieldValues>({
  children,
  onSubmit,
  noValidate = false,
  ...rest
}: FormProps<TFieldValues>) => {
  const methods = useForm<TFieldValues>(rest);

  return (
    <FormProvider {...methods}>
      <Box w="100%">
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate={noValidate}>
          {children}
        </form>
      </Box>
    </FormProvider>
  );
};

