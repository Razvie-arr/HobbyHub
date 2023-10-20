import { type ReactNode } from 'react';
import * as React from 'react';
import { useMutation } from '@apollo/client';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { gql } from 'src/gql';
import { Button, ErrorBanner, Stack } from 'src/shared/design-system';
import { Form, InputField, zod, zodResolver } from 'src/shared/forms';

import { useAuth } from '../auth-core';

const schema = zod
  .object({
    email: zod.string().email().nonempty(),
    name: zod.string().nonempty({ message: 'Name is required' }),
    password: zod.string().nonempty({ message: 'Password is required' }),
    passwordConfirmation: zod.string().nonempty({ message: 'Password confirmation is required' }),
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

export interface SignUpFormProps {
  isLoading: boolean;
  errorMessage?: string;
  onSubmit: (data: { email: string; password: string; firstName: string; lastName: string; userName: string }) => void;
  children?: ReactNode;
}

const SIGNUP_MUTATION = gql(/* GraphQL */ `
  mutation SignUp($email: String!, $name: String!, $password: String!) {
    signUp(email: $email, name: $name, password: $password) {
      user {
        id
        name
        email
      }
      token
    }
  }
`);

export function SignUpForm({ children }: React.PropsWithChildren) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const auth = useAuth();
  const navigate = useNavigate();
  const [signUpRequest, signUpRequestState] = useMutation(SIGNUP_MUTATION, {
    onCompleted: ({ signUp: { user, token } }) => {
      // auth.signIn({ token, user });
    },
    onError: () => {},
  });

  const methods = useForm<FormValues>({
    defaultValues: initialValues,
    resolver: zodResolver(schema),
  });
  return (
    <>
      <Button colorScheme="purple" size={{ base: 'sm', md: 'md' }} onClick={onOpen}>
        Sign up
      </Button>
      <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody px={6} py={9}>
            <Text fontSize="2xl" fontWeight="bold">
              Create your account
            </Text>
            <FormProvider {...methods}>
              <form noValidate>
                <Stack spacing="3" py="4">
                  {signUpRequestState.error && <ErrorBanner title={signUpRequestState.error.message} />}
                  <InputField
                    name="name"
                    label="Name"
                    type="text"
                    isRequired
                    autoFocus
                    autoComplete="on"
                    autoCorrect="off"
                    autoCapitalize="off"
                  />
                  <InputField
                    name="email"
                    label="Email"
                    type="email"
                    isRequired
                    placeholder="e.g. john@doe.com"
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
                  <InputField
                    name="passwordConfirmation"
                    label="Password Confirmation"
                    type="password"
                    isRequired
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                  />
                </Stack>
                <Button
                  width="100%"
                  size="lg"
                  type="submit"
                  isLoading={signUpRequestState.loading}
                  colorScheme="purple"
                  mt="3"
                  onClick={() => {
                    const formValues = methods.getValues();
                    void signUpRequest({ variables: formValues });
                  }}
                >
                  Sign Up
                </Button>
                {children}
              </form>
            </FormProvider>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

