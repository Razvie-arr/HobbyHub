import { type ReactNode } from 'react';
import * as React from 'react';
import { useMutation } from '@apollo/client';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { gql } from 'src/gql';
import { Button, ErrorBanner, Link, Stack, useDisclosure } from 'src/shared/design-system';
import { Form, InputField, zod, zodResolver } from 'src/shared/forms';

import { useAuth } from '../auth-core';

const schema = zod.object({
  email: zod.string().email().nonempty(),
  password: zod.string().nonempty({ message: 'Password is required' }),
});

type FormValues = zod.infer<typeof schema>;

const initialValues: FormValues = {
  email: '',
  password: '',
};
export interface SingInFormProps {
  children?: ReactNode;
  isLoading: boolean;
  errorMessage?: string;
  onSubmit: (data: { email: string; password: string }) => void;
}

const SIGNIN_MUTATION = gql(/* GraphQL */ `
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      user {
        id
        name
        email
      }
      token
    }
  }
`);

export function SignInForm({ children }: React.PropsWithChildren) {
  const auth = useAuth();
  const navigate = useNavigate();

  const [signInRequest, signInRequestState] = useMutation(SIGNIN_MUTATION, {
    onCompleted: ({ signIn: { user, token } }) => {
      auth.signIn({ token, user });
      navigate('/');
    },
    onError: () => {},
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Button colorScheme="purple" onClick={onOpen}>
        Sign in
      </Button>

      <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody px={6} py={9}>
            <Text fontSize="2xl" fontWeight="bold">
              Sign in to your account
            </Text>
            <Form onSubmit={() => {}} defaultValues={initialValues} resolver={zodResolver(schema)} noValidate>
              <Stack spacing="3" py="4">
                {signInRequestState.error && <ErrorBanner title={signInRequestState.error.message} />}
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
                <Link color="purple.500">Forgot password?</Link>
              </Stack>
              <Button
                width="100%"
                size="lg"
                type="submit"
                isLoading={signInRequestState.loading}
                colorScheme="purple"
                mt="3"
              >
                Sign In
              </Button>
              {children}
            </Form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

