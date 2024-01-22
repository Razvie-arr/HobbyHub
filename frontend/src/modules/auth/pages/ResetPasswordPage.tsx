import { useMutation } from '@apollo/client';
import { Card, CardBody, CardHeader, Center, Heading, VStack } from '@chakra-ui/react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { route } from 'src/route';
import { Form, PasswordField, zod, zodResolver } from 'src/shared/forms';
import { SubmitButton } from 'src/shared/forms/molecules/SubmitButton';

import { ContentContainer } from '../../../shared/layout';
import { RESET_PASSWORD_MUTATION } from '../mutations/resetPasswordMutation';

const schema = zod
  .object({
    password: zod.string(),
    confirmPassword: zod.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type FormValues = zod.infer<typeof schema>;

const initialValues: FormValues = {
  password: '',
  confirmPassword: '',
};

export const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const navigate = useNavigate();

  const [resetPasswordRequest, resetPasswordRequestState] = useMutation(RESET_PASSWORD_MUTATION, {
    onCompleted: () => {
      navigate(route.passwordUpdated());
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
                void resetPasswordRequest({ variables: { password: formValues.password, token: token } });
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
  ) : null;
};

