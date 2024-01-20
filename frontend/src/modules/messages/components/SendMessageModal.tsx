import { ReactNode } from 'react';
import { useMutation } from '@apollo/client';
import { useDisclosure, useToast } from '@chakra-ui/react';

import { SEND_MESSAGE } from 'src/modules/messages/mutations';
import { ModalForm, TextareaField, zod, zodResolver } from 'src/shared/forms';
import { WithAuthUser } from 'src/shared/types';

import { WithRecipient } from '../types';

const schema = zod.object({
  message: zod.string().min(1, { message: 'Message cannot be empty' }),
});

type FormValues = zod.infer<typeof schema>;

const initialValues: FormValues = {
  message: '',
};

export const SendMessageModal = ({
  user,
  recipient,
  messageButtonText = 'Message',
  modalButtonIcon,
}: WithAuthUser & WithRecipient & { messageButtonText: string; modalButtonIcon?: ReactNode }) => {
  const disclosure = useDisclosure();
  const toast = useToast();

  const [sendMessage, sendMessageRequestState] = useMutation(SEND_MESSAGE, {
    onCompleted: disclosure.onClose,
  });

  const modalButtonProps = {
    rounded: 'full',
    w: '100%',
    leftIcon: modalButtonIcon as React.ReactElement,
  };

  return (
    <ModalForm
      disclosure={disclosure}
      error={sendMessageRequestState.error?.message}
      modalButtonVariant="outline"
      formProps={{
        defaultValues: initialValues,
        noValidate: true,
        onSubmit: async (formValues) => {
          await sendMessage({
            variables: {
              recipient: { email: recipient.email, first_name: recipient.first_name, id: recipient.id },
              sender: { first_name: user.first_name, id: user.id },
              text: formValues.message,
            },
          });
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
      modalButtonText={messageButtonText}
      modalTitle={`Send a message to ${recipient.first_name} ${recipient.last_name}`}
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

