import { useMutation } from '@apollo/client';
import { Card, CardBody, CardHeader, Heading, useDisclosure, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { route } from 'src/route';
import { Form, zod, zodResolver } from 'src/shared/forms';
import { SubmitButton } from 'src/shared/forms/molecules/SubmitButton';

import { EmailField, NameField, PasswordField } from '../components/fields';
import { EmailVerificationModal } from '../components/SignUpForm/EmailVerificationModal';
import { SIGN_UP_MUTATION } from '../queries';

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

export const SignUpPage = () => {
  const emailVerificationModalDisclosure = useDisclosure();
  const navigate = useNavigate();
  const [signUpRequest, signUpRequestState] = useMutation(SIGN_UP_MUTATION, {
    onCompleted: () => {
      emailVerificationModalDisclosure.onOpen();
      navigate(route.home());
    },
    onError: () => {},
  });

  return (
    <>
      <Card p={6} alignSelf="center" minW="sm" w="50%" justifySelf="center" m={14}>
        <CardHeader>
          <Heading size="md">Create your account</Heading>
        </CardHeader>
        <CardBody>
          <Form
            defaultValues={initialValues}
            resolver={zodResolver(schema)}
            onSubmit={(formValues: FormValues) => {
              void signUpRequest({ variables: formValues });
            }}
          >
            <VStack gap={3}>
              <NameField name="first_name" label="First name" autoFocus />
              <NameField name="last_name" label="Last name" />
              <EmailField />
              <PasswordField confirmPassword />
            </VStack>
            <SubmitButton isLoading={signUpRequestState.loading} text="Sign up"></SubmitButton>
          </Form>
        </CardBody>
      </Card>
      <EmailVerificationModal disclosure={emailVerificationModalDisclosure} />
    </>
  );
};

