import { useMutation } from '@apollo/client';
import { Card, CardBody, CardHeader, Center, Heading, useToast, VStack } from '@chakra-ui/react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { route } from 'src/route';
import { Form, PasswordField, zod, zodResolver } from 'src/shared/forms';
import { SubmitButton } from 'src/shared/forms/molecules/SubmitButton';
import { NotFoundPage } from 'src/shared/navigation';

import { ContentContainer } from '../../../shared/layout';
import { RESET_PASSWORD_MUTATION } from '../mutations/resetPasswordMutation';

const schema = zod
  .object({
    password: zod.string().min(1, { message: 'Password is required' }),
    passwordConfirmation: zod.string().min(1, { message: 'Password confirmation is required' }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords must match',
    path: ['passwordConfirmation'],
  });

type FormValues = zod.infer<typeof schema>;

const initialValues: FormValues = {
  password: '',
  passwordConfirmation: '',
};

export const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const toast = useToast();

  const navigate = useNavigate();

  const [resetPasswordRequest, resetPasswordRequestState] = useMutation(RESET_PASSWORD_MUTATION, {
    onCompleted: () => {
      navigate(route.signIn());
      toast({
        variant: 'left-accent',
        status: 'success',
        position: 'top-right',
        title: 'Password updated!',
        description: 'Your password has been updated successfully. You can sign in now.',
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        variant: 'left-accent',
        status: 'error',
        position: 'top-right',
        title: 'Something went wrong!',
        description: 'The link has expired. Please request a new forgot password link.',
        isClosable: true,
      });
    },
  });

  return token ? (
    <ContentContainer>
      <Center>
        <Card p={6} alignSelf="center" minW="sm" w="50%" justifySelf="center" m={14}>
          <CardHeader>
            <Heading size="md">Set new password</Heading>
          </CardHeader>
          <CardBody>
            <Form
              defaultValues={initialValues}
              resolver={zodResolver(schema)}
              onSubmit={(formValues: FormValues) => {
                void resetPasswordRequest({ variables: { password: formValues.passwordConfirmation, token: token } });
              }}
            >
              <VStack gap={3}>
                <PasswordField confirmPassword />
              </VStack>
              <SubmitButton isLoading={resetPasswordRequestState.loading} text="Reset password"></SubmitButton>
            </Form>
          </CardBody>
        </Card>
      </Center>
    </ContentContainer>
  ) : (
    <NotFoundPage />
  );
};

