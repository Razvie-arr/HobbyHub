import * as React from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { Button, Disclosure, Flex, useDisclosure, WithDisclosure } from 'src/shared/design-system';
import { EmailField, ModalForm, PasswordField, zod, zodResolver } from 'src/shared/forms';

import { route } from '../../../../route';
import { useAuth } from '../../auth-core';
import { SIGN_IN_MUTATION } from '../../mutations';

import { ForgotPasswordModal } from './ForgotPasswordModal';
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
  const forgotPasswordModalDisclosure = useDisclosure({ defaultIsOpen: false });

  const auth = useAuth();
  const navigate = useNavigate();
  const [signInRequest, signInRequestState] = useMutation(SIGN_IN_MUTATION, {
    onCompleted: ({ signIn: { user, token } }) => {
      disclosure.onClose();
      auth.signIn({ token, user });
      if (user.event_types.length === 0 || !user.location) {
        navigate(route.onboarding());
      } else {
        navigate(route.events());
      }
    },
    onError: () => {},
  });

  const handleForgotPasswordClick = () => {
    disclosure.onClose();
    forgotPasswordModalDisclosure.onOpen();
  };

  const handleReturnToSignInClick = () => {
    forgotPasswordModalDisclosure.onClose();
    disclosure.onOpen();
  };

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
        <Flex>
          <Button variant="link" color="purple.500" onClick={handleForgotPasswordClick}>
            Forgot password
          </Button>
        </Flex>
      </ModalForm>
      <ForgotPasswordModal
        disclosure={forgotPasswordModalDisclosure}
        handleReturnToSignInClick={handleReturnToSignInClick}
      />
    </>
  );
};

