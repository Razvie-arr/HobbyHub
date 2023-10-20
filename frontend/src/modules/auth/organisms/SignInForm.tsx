import { type ReactNode } from 'react';
import * as React from 'react';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';

import { Button, ErrorBanner, Stack, useDisclosure } from 'src/shared/design-system';
import { Form, InputField, zod, zodResolver } from 'src/shared/forms';

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

export function SignInForm({
  isLoading,
  errorMessage,
  onSubmit,
  children,
}: SingInFormProps) {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
    <Button colorScheme="purple" onClick={onOpen}>Open Modal</Button>

    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody px={6} py={9}>
        <Text fontSize="2xl" fontWeight='bold'>Sign in to your account</Text>
        <Form
            onSubmit={onSubmit}
            defaultValues={initialValues}
            resolver={zodResolver(schema)}
            noValidate
            >
            <Stack spacing="3" py="4">
                {errorMessage && <ErrorBanner title={errorMessage} />}
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
            </Stack>
            <Button
                width='100%'
                size="lg"
                type="submit"
                isLoading={isLoading}
                colorScheme="purple"
                mt="4"
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
