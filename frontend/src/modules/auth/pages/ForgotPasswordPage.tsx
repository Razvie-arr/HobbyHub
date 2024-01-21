import { useMutation } from '@apollo/client';
import { Card, CardBody, CardHeader, Center, Heading, useDisclosure, VStack } from '@chakra-ui/react';

import { EmailField, Form, zod, zodResolver } from 'src/shared/forms';
import { SubmitButton } from 'src/shared/forms/molecules/SubmitButton';

import { ContentContainer } from '../../../shared/layout';
import { EmailVerificationModal } from '../components/SignUpForm/EmailVerificationModal';
import { REQUEST_RESET_PASSWORD_MUTATION } from '../queries';

const schema = zod.object({
  email: zod.string().email().min(1),
});

type FormValues = zod.infer<typeof schema>;

const initialValues: FormValues = {
  email: '',
};

export const ForgotPasswordPage = () => {
  const emailVerificationModalDisclosure = useDisclosure();
  const [resetPasswordRequest, resetPasswordRequestState] = useMutation(REQUEST_RESET_PASSWORD_MUTATION, {
    onCompleted: () => {
      emailVerificationModalDisclosure.onOpen();
    },
    onError: () => {},
  });

  return (
    <ContentContainer>
      <Center>
        <Card p={6} minW="sm" w="50%" m={14}>
          <CardHeader>
            <Heading size="md">Forgot password</Heading>
          </CardHeader>
          <Heading size="sm" fontWeight="normal" pl="5">
            We'll send you a link to reset your password.
          </Heading>
          <CardBody>
            <Form
              defaultValues={initialValues}
              resolver={zodResolver(schema)}
              onSubmit={(formValues: FormValues) => {
                void resetPasswordRequest({ variables: formValues });
              }}
            >
              <VStack gap={3}>
                <EmailField />
              </VStack>
              <SubmitButton isLoading={resetPasswordRequestState.loading} text="Send a link to my email"></SubmitButton>
            </Form>
          </CardBody>
        </Card>
      </Center>
      <EmailVerificationModal
        disclosure={emailVerificationModalDisclosure}
        text="To complete the password reset process, please check your email inbox."
      />
    </ContentContainer>
  );
};

