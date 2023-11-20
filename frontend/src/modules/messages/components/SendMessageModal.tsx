import { useMutation } from '@apollo/client';
import { useToast } from '@chakra-ui/react';

import { SEND_MESSAGE } from 'src/modules/messages/mutations';
import { WithDisclosure } from 'src/shared/design-system';
import { InputField, ModalForm, zod, zodResolver } from 'src/shared/forms';
import { WithAuthUser } from 'src/shared/types';

const schema = zod.object({
  message: zod.string().min(1, { message: 'Message cannot be empty' }),
});

type FormValues = zod.infer<typeof schema>;

const initialValues: FormValues = {
  message: '',
};

export const SendMessageModal = ({
  disclosure,
  user,
  recipient,
}: WithDisclosure &
  WithAuthUser & {
    recipient: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
    };
  }) => {
  const [sendMessage, sendMessageRequestState] = useMutation(SEND_MESSAGE, {
    onCompleted: disclosure.onClose,
  });
  const toast = useToast();

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
      modalButtonText="Message"
      modalTitle={`Send a message to ${recipient.first_name} ${recipient.last_name}`}
      submitButtonProps={{
        isLoading: sendMessageRequestState.loading,
        text: 'Message',
      }}
      modalButtonProps={{ rounded: 'full' }}
    >
      <InputField name="message" placeholder="Write a message..." isDisabled={sendMessageRequestState.loading} />
    </ModalForm>
  );
};

