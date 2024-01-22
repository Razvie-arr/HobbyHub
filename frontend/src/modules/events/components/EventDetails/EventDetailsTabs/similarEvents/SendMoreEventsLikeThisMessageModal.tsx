import { useMutation } from '@apollo/client';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { FaMessage } from 'react-icons/fa6';

import { ModalForm, TextareaField, zod, zodResolver } from 'src/shared/forms';
import { WithAuthUser, WithEvent } from 'src/shared/types';

import { WithRecipient } from '../../../../../messages';
import { SEND_MORE_EVENTS_LIKE_THIS_MESSAGE } from '../../../../mutations';

const schema = zod.object({
  message: zod.string().min(1, { message: 'Message cannot be empty' }),
});

type FormValues = zod.infer<typeof schema>;

const initialValues: FormValues = {
  message: 'I want to join more events that are just as great as this one!',
};

const modalButtonProps = {
  rounded: 'full',
  w: '100%',
  size: 'sm',
  background: 'blue.800',
  _hover: { background: 'blue.700' },
  color: 'white',
  leftIcon: <FaMessage />,
};

export const SendMoreEventsLikeThisMessageModal = ({
  user,
  recipient,
  event,
}: WithAuthUser & WithRecipient & WithEvent) => {
  const disclosure = useDisclosure();
  const toast = useToast();

  const [sendMoreEventsLikeThisMessage, sendMoreEventsLikeThisMessageRequestState] = useMutation(
    SEND_MORE_EVENTS_LIKE_THIS_MESSAGE,
    {
      onCompleted: disclosure.onClose,
    },
  );

  return (
    <ModalForm
      disclosure={disclosure}
      error={sendMoreEventsLikeThisMessageRequestState.error?.message}
      modalButtonVariant="outline"
      formProps={{
        defaultValues: initialValues,
        noValidate: true,
        onSubmit: async (formValues) => {
          await sendMoreEventsLikeThisMessage({
            variables: {
              recipient: {
                email: recipient.email,
                first_name: recipient.first_name,
                last_name: recipient.last_name,
                id: recipient.id,
              },
              sender: { email: user.email, first_name: user.first_name, last_name: user.last_name, id: user.id },
              event: {
                id: event.id,
                name: event.name,
              },
              emailBody: formValues.message,
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
      modalButtonText="More events like this"
      modalTitle={`Let ${recipient.first_name} ${recipient.last_name} know that you want more events like this!`}
      submitButtonProps={{
        isLoading: sendMoreEventsLikeThisMessageRequestState.loading,
        text: 'Message',
      }}
      modalButtonProps={modalButtonProps}
    >
      <TextareaField
        autoFocus
        name="message"
        placeholder="Write a message..."
        isDisabled={sendMoreEventsLikeThisMessageRequestState.loading}
      />
    </ModalForm>
  );
};

