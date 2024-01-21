import { useMutation } from '@apollo/client';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { FaMessage } from 'react-icons/fa6';

import { ModalForm, TextareaField, zod, zodResolver } from 'src/shared/forms';
import { WithEvent } from 'src/shared/types';

import { SEND_MASS_MESSAGE } from '../../../../mutations';

const schema = zod.object({
  message: zod.string().min(1, { message: 'Message cannot be empty' }),
});

type FormValues = zod.infer<typeof schema>;

const initialValues: FormValues = {
  message: '',
};

export const SendMassMessageModal = ({ event }: WithEvent) => {
  const disclosure = useDisclosure();
  const toast = useToast();

  const [sendMassMessage, sendMassMessageRequestState] = useMutation(SEND_MASS_MESSAGE, {
    onCompleted: disclosure.onClose,
  });

  const modalButtonProps = {
    rounded: 'full',
    w: '100%',
    leftIcon: <FaMessage />,
  };

  return (
    <ModalForm
      disclosure={disclosure}
      error={sendMassMessageRequestState.error?.message}
      modalButtonVariant="outline"
      formProps={{
        defaultValues: initialValues,
        noValidate: true,
        onSubmit: async (formValues) => {
          await sendMassMessage({
            variables: { eventId: event.id, emailBody: formValues.message, emailSubject: 'Message from HobbyHub' },
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
      modalButtonText="Message all participants"
      modalTitle="Send a message to all participants"
      submitButtonProps={{
        isLoading: sendMassMessageRequestState.loading,
        text: 'Message',
      }}
      modalButtonProps={modalButtonProps}
    >
      <TextareaField
        autoFocus
        name="message"
        placeholder="Write a message..."
        isDisabled={sendMassMessageRequestState.loading}
      />
    </ModalForm>
  );
};

