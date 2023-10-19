import { type ReactNode } from 'react';

import { Button, ErrorBanner, Stack } from 'src/shared/design-system';
import { Form, InputField, zod, zodResolver } from 'src/shared/forms';

const schema = zod.object({
  email: zod.string().email().nonempty(),
  password: zod.string().nonempty({ message: 'Password is required' }),
});

type FormValues = zod.infer<typeof schema>;

const initialValues: FormValues = {
  email: '',
  password: '',
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type SingInFormProps = {
  children?: ReactNode;
  isLoading: boolean;
  errorMessage?: string;
  onSubmit: (data: { email: string; password: string }) => void;
};

export function SignInForm({
  isLoading,
  errorMessage,
  onSubmit,
  children,
}: SingInFormProps) {
  return (
    <Form
      onSubmit={onSubmit}
      defaultValues={initialValues}
      resolver={zodResolver(schema)}
      noValidate
    >
      <Stack spacing="3" py="4">
        {errorMessage && <ErrorBanner title={errorMessage} />}
        <InputField
          name="email"
          label="Email"
          type="email"
          placeholder="e.g. john@doe.com"
          isRequired
          autoFocus
          autoComplete="on"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <InputField
          name="password"
          label="Password"
          type="password"
          isRequired
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
      </Stack>
      <Button
        size="lg"
        type="submit"
        isLoading={isLoading}
        colorScheme="green"
        mt="4"
        mb="2"
      >
        Sign In
      </Button>
      {children}
    </Form>
  );
}
