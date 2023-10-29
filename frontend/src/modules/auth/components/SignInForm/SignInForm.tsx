import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { Disclosure, Link, WithDisclosure } from 'src/shared/design-system';
import { ModalForm, zod, zodResolver } from 'src/shared/forms';

import { route } from '../../../../route';
import { useAuth } from '../../auth-core';
import { SIGN_IN_MUTATION } from '../../queries';
import { EmailField, PasswordField } from '../fields';

import { OrSignUpButton } from './OrSignUpButton';

const schema = zod.object({
  email: zod.string().email().min(1),
  password: zod.string().min(1, { message: 'Password is required' }),
});

type FormValues = zod.infer<typeof schema>;

const initialValues: FormValues = {
  email: '',
  password: '',
};

interface SignInFormProps extends WithDisclosure {
  signUpModalDisclosure: Disclosure;
}

export const SignInForm = ({ disclosure, signUpModalDisclosure }: SignInFormProps) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [signInRequest, signInRequestState] = useMutation(SIGN_IN_MUTATION, {
    onCompleted: ({ signIn: { user, token } }) => {
      disclosure.onClose();
      // @ts-expect-error
      auth.signIn({ token, user });
      if (user.event_types.length === 0 || !user.location) {
        navigate(route.onboarding());
      } else {
        navigate(route.home());
      }
    },
    onError: () => {},
  });
  return (
    <>
      <ModalForm
        additionalButtons={
          <OrSignUpButton
            handleClick={() => {
              disclosure.onClose();
              signUpModalDisclosure.onOpen();
            }}
          />
        }
        disclosure={disclosure}
        error={signInRequestState.error?.message}
        formProps={{
          defaultValues: initialValues,
          noValidate: true,
          onSubmit: (formValues: FormValues) => {
            void signInRequest({ variables: formValues });
          },
          resolver: zodResolver(schema),
        }}
        modalButtonText="Sign in"
        modalButtonVariant="outline"
        modalTitle="Sign in to your account"
        submitButtonProps={{
          isLoading: signInRequestState.loading,
          text: 'Sign in',
        }}
      >
        <EmailField />
        <PasswordField />
        <Link color="purple.500">Forgot password?</Link>
      </ModalForm>
    </>
  );
};

