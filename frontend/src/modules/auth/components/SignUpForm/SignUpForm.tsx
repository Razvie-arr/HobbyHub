import { ReactNode } from 'react';
import { useMutation } from '@apollo/client';

import { ButtonProps, useDisclosure, WithDisclosure } from 'src/shared/design-system';
import { EmailField, ModalForm, NameField, PasswordField, zod, zodResolver } from 'src/shared/forms';

import { SIGN_UP_MUTATION } from '../../mutations';

import { EmailVerificationModal } from './EmailVerificationModal';

const schema = zod
  .object({
    email: zod.string().email().min(1),
    first_name: zod.string().min(1, { message: 'First name is required' }),
    last_name: zod.string().min(1, { message: 'Last name is required' }),
    password: zod.string().min(1, { message: 'Password is required' }),
    passwordConfirmation: zod.string().min(1, { message: 'Password confirmation is required' }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords must match',
    path: ['passwordConfirmation'],
  });

type FormValues = zod.infer<typeof schema>;

const initialValues: FormValues = {
  email: '',
  first_name: '',
  last_name: '',
  password: '',
  passwordConfirmation: '',
};

interface SignUpFormProps extends WithDisclosure {
  modalButtonText?: ReactNode;
  modalButtonProps?: ButtonProps;
}

export const SignUpForm = ({ disclosure, modalButtonText = 'Sign up', modalButtonProps }: SignUpFormProps) => {
  const emailVerificationModalDisclosure = useDisclosure();

  const [signUpRequest, signUpRequestState] = useMutation(SIGN_UP_MUTATION, {
    onCompleted: () => {
      disclosure.onClose();
      emailVerificationModalDisclosure.onOpen();
    },
    onError: () => {},
  });

  return (
    <>
      <ModalForm
        disclosure={disclosure}
        error={signUpRequestState.error?.message}
        formProps={{
          defaultValues: initialValues,
          noValidate: true,
          onSubmit: (formValues: FormValues) => {
            void signUpRequest({ variables: formValues });
          },
          resolver: zodResolver(schema),
        }}
        modalButtonText={modalButtonText}
        modalButtonProps={modalButtonProps}
        modalTitle="Create your account"
        submitButtonProps={{
          isLoading: signUpRequestState.loading,
          text: 'Sign up',
        }}
      >
        <NameField name="first_name" label="First name" autoFocus />
        <NameField name="last_name" label="Last name" />
        <EmailField />
        <PasswordField confirmPassword />
      </ModalForm>
      <EmailVerificationModal
        disclosure={emailVerificationModalDisclosure}
        text="To complete the account verification process, please check your email inbox."
      />
    </>
  );
};

