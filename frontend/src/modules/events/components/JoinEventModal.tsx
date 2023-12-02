import { useMutation } from '@apollo/client';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { match } from 'ts-pattern';

import { InputField, ModalForm, zod, zodResolver } from 'src/shared/forms';
import { WithEvent, WithNullableAuthUser } from 'src/shared/types';

import { AuthPromptModal } from '../../../shared/design-system/molecules/AuthPromptModal';
import { getCurrentDateTime } from '../../../utils/form';

const schema = zod.object({
  message: zod.string().min(1, { message: 'Message cannot be empty' }),
});

type FormValues = zod.infer<typeof schema>;

const initialValues: FormValues = {
  message: '',
};

export const JoinEventModal = ({ user, event }: WithNullableAuthUser & WithEvent) => {
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
          size: 'sm',
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
      modalButtonProps={{ size: 'sm', rounded: 'full', isDisabled }}
    >
      <InputField
        name="message"
        placeholder="Write a message..."
        // isDisabled={sendMessageRequestState.loading}
      />
    </ModalForm>
  );
};

