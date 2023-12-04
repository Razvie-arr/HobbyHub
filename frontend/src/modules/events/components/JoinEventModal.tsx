import { useMutation } from '@apollo/client';
import { Box, Tag, useDisclosure } from '@chakra-ui/react';
import { Option, pipe, ReadonlyArray } from 'effect';
import { match } from 'ts-pattern';

import { ModalForm, TextareaField, zod, zodResolver } from 'src/shared/forms';
import { WithEvent, WithNullableAuthUser } from 'src/shared/types';

import { ParticipantState } from '../../../gql/graphql';
import { AuthPromptModal } from '../../../shared/design-system';
import { getCurrentDateTime } from '../../../utils/form';
import { REQUEST_EVENT_REGISTRATION } from '../mutations';

import { JoinEventSubmissionModal } from './JoinEventSubmissionModal';
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

const commonTagProps = {
  rounded: 'full',
  w: '100%',
  display: 'block',
  lineHeight: 2.2,
  variant: 'solid',
};

export const JoinEventModal = ({ user, event, buttonSize = 'md' }: JoinEventModalProps) => {
  const joinEventModalDisclosure = useDisclosure();
  const joinEventSubmissionModalDisclosure = useDisclosure();

  const [requestEventRegistration, requestEventRegistrationRequestState] = useMutation(REQUEST_EVENT_REGISTRATION, {
    onCompleted: () => {
      joinEventModalDisclosure.onClose();
      joinEventSubmissionModalDisclosure.onOpen();
    },
  });

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

  const userParticipant = pipe(
    event.participants,
    ReadonlyArray.findFirst((participant) => participant.user.id === user.id),
  );

  if (Option.isSome(userParticipant)) {
    return (
      <Box textAlign="center" w="100%">
        {match(userParticipant.value.state)
          .with(ParticipantState.Accepted, () => (
            <Tag {...commonTagProps} colorScheme="green">
              Accepted
            </Tag>
          ))
          .with(ParticipantState.Pending, () => (
            <Tag {...commonTagProps} colorScheme="orange">
              Pending
            </Tag>
          ))
          .exhaustive()}
      </Box>
    );
  }

  const hasEventExpired = event.start_datetime.slice(0, 23) < getCurrentDateTime();

  const isDisabled =
    !isUserOrganizer && (hasEventExpired || (event.participants.length === event.capacity && !event.allow_waitlist));

  return (
    <>
      <ModalForm
        disclosure={joinEventModalDisclosure}
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
      <JoinEventSubmissionModal disclosure={joinEventSubmissionModalDisclosure} />
    </>
  );
};

