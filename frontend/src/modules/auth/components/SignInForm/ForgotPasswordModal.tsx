import { useMutation } from '@apollo/client';
import {
  Flex,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa6';

import { useDisclosure, WithDisclosure } from 'src/shared/design-system';
import { EmailField, Form, zod, zodResolver } from 'src/shared/forms';
import { SubmitButton } from 'src/shared/forms/molecules/SubmitButton';

import { REQUEST_RESET_PASSWORD_MUTATION } from '../../mutations';
import { EmailVerificationModal } from '../SignUpForm/EmailVerificationModal';

const schema = zod.object({
  email: zod.string().email().min(1),
});

type FormValues = zod.infer<typeof schema>;

const initialValues: FormValues = {
  email: '',
};

interface ForgotPasswordModalProps extends WithDisclosure {
  handleReturnToSignInClick: () => void;
}

export const ForgotPasswordModal = ({ disclosure, handleReturnToSignInClick }: ForgotPasswordModalProps) => {
  const emailVerificationModalDisclosure = useDisclosure();
  const [resetPasswordRequest, resetPasswordRequestState] = useMutation(REQUEST_RESET_PASSWORD_MUTATION, {
    onCompleted: () => {
      emailVerificationModalDisclosure.onOpen();
    },
    onError: () => {},
  });
  return (
    <>
      <Modal isOpen={disclosure.isOpen} onClose={disclosure.onClose}>
        <ModalOverlay />
        <ModalContent p={6}>
          <Flex justifyItems="center" alignItems="center">
            <IconButton
              flex={1 / 7}
              aria-label="Back"
              color=""
              bg="none"
              icon={<FaArrowLeft />}
              onClick={handleReturnToSignInClick}
            />
            <ModalHeader flex={1} width="100%">
              Forgot password
            </ModalHeader>
          </Flex>
          <ModalCloseButton />
          <ModalBody px={6} pb={6}>
            <Heading size="sm" fontWeight="normal" mb={5}>
              We'll send you a link to reset your password.
            </Heading>
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
          </ModalBody>
        </ModalContent>
        <EmailVerificationModal
          disclosure={emailVerificationModalDisclosure}
          text="To complete the password reset process, please check your email inbox."
        />
      </Modal>
    </>
  );
};

