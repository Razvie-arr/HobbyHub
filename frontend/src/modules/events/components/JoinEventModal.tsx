import { useMutation } from '@apollo/client';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { match } from 'ts-pattern';

import { ModalForm, TextareaField, zod, zodResolver } from 'src/shared/forms';
import { WithEvent, WithNullableAuthUser } from 'src/shared/types';

import { AuthPromptModal } from '../../../shared/design-system/molecules/AuthPromptModal';
import { getCurrentDateTime } from '../../../utils/form';

import { EditEventButton } from './shared';

const schema = zod.object({
  message: zod.string().min(1, { message: 'Message cannot be empty' }),
});

type FormValues = zod.infer<typeof schema>;

const initialValues: FormValues = {
  message: '',
};

interface JoinEventModalProps extends WithNullableAuthUser, WithEvent {
  buttonSize?: 'sm' | 'md' | 'lg' | 'xs';
}

export const JoinEventModal = ({ user, event, buttonSize = 'md' }: JoinEventModalProps) => {
  const disclosure = useDisclosure();
  const toast = useToast();
  // const [sendMessage, sendMessageRequestState] = useMutation(SEND_MESSAGE, {
  //   onCompleted: disclosure.onClose,
  // });

  if (!user) {
    return (
      <AuthPromptModal
        modalButtonLabel="Join event"
        modalButtonProps={{
          size: buttonSize,
          colorScheme: 'purple',
          borderRadius: 'full',
        }}
      />
    );
  }

  const owner = match(event.author)
    .with({ __typename: 'User' }, (author) => author)
    .with({ __typename: 'Group' }, ({ admin }) => admin)
    .exhaustive();

  const isOwner = user ? user.id === owner.id : false;

  if (isOwner) {
    return (
      <EditEventButton eventId={event.id} rounded="full" size={buttonSize} colorScheme="purple" variant="outline" />
    );
  }

  const hasEventExpired = event.start_datetime.slice(0, 23) < getCurrentDateTime();

  const isDisabled =
    !isOwner && (hasEventExpired || (event.participants.length === event.capacity && !event.allow_waitlist));

  return (
    <ModalForm
      disclosure={disclosure}
      // error={sendMessageRequestState.error?.message}
      formProps={{
        defaultValues: initialValues,
        noValidate: true,
        onSubmit: async (formValues) => {
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
      modalButtonText="Join Event"
      modalTitle={event.name}
      modalDescription={
        <>
          <span>Are you sure you would like to attend this event?</span>
          <br />
          <span>Tell the organizer more about you.</span>
        </>
      }
      // @ts-expect-error
      submitButtonProps={{
        // isLoading: sendMessageRequestState.loading,
        text: "I'm in!",
      }}
      modalButtonProps={{ size: buttonSize, rounded: 'full', isDisabled }}
    >
      <TextareaField
        autoFocus
        name="message"
        placeholder="Write a message..."
        // isDisabled={sendMessageRequestState.loading}
      />
    </ModalForm>
  );
};

