import { useMutation } from '@apollo/client';
import { Card, CardBody, CardHeader, Heading, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { route } from 'src/route';
import { Link } from 'src/shared/design-system';
import { Form, zod, zodResolver } from 'src/shared/forms';
import { SubmitButton } from 'src/shared/forms/molecules/SubmitButton';
import { ReactRouterLink } from 'src/shared/navigation';

import { useAuth } from '../auth-core';
import { EmailField, PasswordField } from '../components/fields';
import { OrSignUpButton } from '../components/SignInForm/OrSignUpButton';
import { SIGN_IN_MUTATION } from '../queries';

const schema = zod.object({
  email: zod.string().email().min(1),
  password: zod.string().min(1, { message: 'Password is required' }),
});

type FormValues = zod.infer<typeof schema>;

const initialValues: FormValues = {
  email: '',
  password: '',
};

export const SignInPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [signInRequest, signInRequestState] = useMutation(SIGN_IN_MUTATION, {
    onCompleted: ({ signIn: { user, token } }) => {
      auth.signIn({ token, user });
      if (user.event_types.length === 0 || !user.location) {
        navigate(route.onboarding());
      } else {
        navigate(route.events());
      }
    },
    onError: () => {},
  });

  return (
    <Card p={6} alignSelf="center" minW="sm" w="50%" justifySelf="center" m={14}>
      <CardHeader>
        <Heading size="md">Sign into your account</Heading>
      </CardHeader>
      <CardBody>
        <Form
          defaultValues={initialValues}
          resolver={zodResolver(schema)}
          onSubmit={(formValues: FormValues) => {
            void signInRequest({ variables: formValues });
          }}
        >
          <VStack gap={3} align="left">
            <EmailField />
            <PasswordField />
            <Link as={ReactRouterLink} to={route.forgotPassword()} color="purple.500">
              Forgot password?
            </Link>
          </VStack>
          <SubmitButton isLoading={signInRequestState.loading} text="Sign in"></SubmitButton>
        </Form>
        <OrSignUpButton
          handleClick={() => {
            navigate(route.signUp());
          }}
        ></OrSignUpButton>
      </CardBody>
    </Card>
  );
};

