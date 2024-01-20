import { Card, CardBody, CardHeader, Center, Heading, VStack } from '@chakra-ui/react';

import { Form, zod, zodResolver } from 'src/shared/forms';
import { SubmitButton } from 'src/shared/forms/molecules/SubmitButton';

import { ContentContainer } from '../../../shared/layout';
import { PasswordField } from '../components/fields';

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

export const ResetPasswordPage = () => (
  <ContentContainer>
    <Center>
      <Card p={6} alignSelf="center" minW="sm" w="50%" justifySelf="center" m={14}>
        <CardHeader>
          <Heading size="md">Set new password</Heading>
        </CardHeader>
        <CardBody>
          <Form defaultValues={initialValues} resolver={zodResolver(schema)} onSubmit={() => {}}>
            <VStack gap={3}>
              <PasswordField confirmPassword />
            </VStack>
            <SubmitButton isLoading={false} text="Reset password"></SubmitButton>
          </Form>
        </CardBody>
      </Card>
    </Center>
  </ContentContainer>
);

