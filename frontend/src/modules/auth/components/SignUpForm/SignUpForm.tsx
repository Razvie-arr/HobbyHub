import { useMutation } from '@apollo/client';

import { useDisclosure, WithDisclosure } from 'src/shared/design-system';
import { ModalForm, zod, zodResolver } from 'src/shared/forms';

import { SIGN_UP_MUTATION } from '../../queries';
import { EmailField, NameField, PasswordField } from '../fields';

import { EmailVerificationModal } from './EmailVerificationModal';

const schema = zod
  .object({
    email: zod.string().email().min(1),
    name: zod.string().min(1, { message: 'Name is required' }),
    password: zod.string().min(1, { message: 'Password is required' }),
    passwordConfirmation: zod.string().min(1, { message: 'Password confirmation is required' }),
    terms: zod.literal<boolean>(true, {
      errorMap: () => ({ message: 'You must accept the terms and conditions' }),
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords must match',
    path: ['passwordConfirmation'],
  });

type FormValues = zod.infer<typeof schema>;

const initialValues: FormValues = {
  email: '',
  name: '',
  password: '',
  passwordConfirmation: '',
  terms: false,
};

export const SignUpForm = ({ disclosure }: WithDisclosure) => {
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
        formProps={{
          defaultValues: initialValues,
          noValidate: true,
          onSubmit: (formValues: FormValues) => {
            void signUpRequest({ variables: formValues });
          },
          resolver: zodResolver(schema),
        }}
        disclosure={disclosure}
        modalButtonText="Sign up"
        modalTitle="Create your account"
        submitButtonProps={{
          isLoading: signUpRequestState.loading,
          text: 'Sign up',
        }}
      >
        <NameField />
        <EmailField />
        <PasswordField confirmPassword />
      </ModalForm>
      <EmailVerificationModal disclosure={emailVerificationModalDisclosure} />
    </>
  );
};

