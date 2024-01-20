import { useDisclosure, useToast } from '@chakra-ui/react';
import { FaMessage } from 'react-icons/fa6';

import { ModalForm, TextareaField, zod, zodResolver } from 'src/shared/forms';
import { WithAuthUser } from 'src/shared/types';

const schema = zod.object({
  message: zod.string().min(1, { message: 'Message cannot be empty' }),
});

type FormValues = zod.infer<typeof schema>;

const initialValues: FormValues = {
  message: '',
};

export const SendMassMessageModal = ({ user }: WithAuthUser) => {
  const disclosure = useDisclosure();
  const toast = useToast();

  const sendMessage = async () => Promise.resolve();

  const sendMessageRequestState = {
    loading: false,
    error: null as { message: string } | null,
  };

  const modalButtonProps = {
    rounded: 'full',
    w: '100%',
    leftIcon: <FaMessage />,
  };

  return (
    <ModalForm
      disclosure={disclosure}
      error={sendMessageRequestState.error?.message}
      modalButtonVariant="outline"
      formProps={{
        defaultValues: initialValues,
        noValidate: true,
        onSubmit: async () => {
          await sendMessage();
          toast({
            variant: 'left-accent',
            status: 'success',
            position: 'top-right',
            title: 'Message sent!',
            description: 'Your message was sent successfully.',
            isClosable: true,
          });
        },
        resolver: zodResolver(schema),
      }}
      modalButtonText="Message all participants"
      modalTitle="Send a message to all participants"
      submitButtonProps={{
        isLoading: sendMessageRequestState.loading,
        text: 'Message',
      }}
      modalButtonProps={modalButtonProps}
    >
      <TextareaField
        autoFocus
        name="message"
        placeholder="Write a message..."
        isDisabled={sendMessageRequestState.loading}
      />
    </ModalForm>
  );
};

