import { useMutation } from '@apollo/client';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { match } from 'ts-pattern';

import { ModalForm, TextareaField, zod, zodResolver } from 'src/shared/forms';
import { WithEvent, WithNullableAuthUser } from 'src/shared/types';

import { AuthPromptModal } from '../../../shared/design-system';
import { getCurrentDateTime } from '../../../utils/form';
import { REQUEST_EVENT_REGISTRATION } from '../mutations';

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
  const [requestEventRegistration, requestEventRegistrationRequestState] = useMutation(REQUEST_EVENT_REGISTRATION);

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

  const organizer = match(event.author)
    .with({ __typename: 'User' }, (author) => author)
    .with({ __typename: 'Group' }, ({ admin }) => admin)
    .exhaustive();

  const isUserOrganizer = user ? user.id === organizer.id : false;

  if (isUserOrganizer) {
    return (
      <EditEventButton eventId={event.id} rounded="full" size={buttonSize} colorScheme="purple" variant="outline" />
    );
  }

  const hasEventExpired = event.start_datetime.slice(0, 23) < getCurrentDateTime();

  const isDisabled =
    !isUserOrganizer && (hasEventExpired || (event.participants.length === event.capacity && !event.allow_waitlist));

  return (
    <ModalForm
      disclosure={disclosure}
      error={requestEventRegistrationRequestState.error?.message}
      formProps={{
        defaultValues: initialValues,
        noValidate: true,
        onSubmit: async (formValues) => {
          await requestEventRegistration({
            variables: {
              eventRegistration: {
                event_id: event.id,
                event_name: event.name,
                text: formValues.message,
                user_email: user.email,
                user_id: user.id,
                user_name: `${user.first_name} ${user.last_name}`,
                author_id: event.author_id,
                group_id: event.group_id,
              },
            },
          });
          disclosure.onClose();
          toast({
            variant: 'left-accent',
            status: 'success',
            position: 'top-right',
            title: 'Join request submitted!',
            description:
              "Your join request was submitted successfully. What's left is to wait for the organizer's response.",
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
      submitButtonProps={{
        isLoading: requestEventRegistrationRequestState.loading,
        text: "I'm in!",
      }}
      modalButtonProps={{ size: buttonSize, rounded: 'full', isDisabled }}
    >
      <TextareaField
        autoFocus
        name="message"
        placeholder="Write a message..."
        isDisabled={requestEventRegistrationRequestState.loading}
      />
    </ModalForm>
  );
};

