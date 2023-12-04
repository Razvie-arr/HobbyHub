import { useMutation } from '@apollo/client';
import { Text, useToast } from '@chakra-ui/react';

import { useDisclosure } from 'src/shared/design-system';
import { ModalForm, TextareaField, zod, zodResolver } from 'src/shared/forms';

import { WithAuthUser } from '../../../shared/types';
import { ADD_REVIEW } from '../mutations';

import { RatingSection } from './RatingSection';

const schema = zod.object({
  rating: zod.number().min(0).max(5),
  comment: zod.string(),
});

type FormValues = zod.infer<typeof schema>;

const initialValues: FormValues = {
  rating: 0,
  comment: '',
};

interface AddReviewModalFormProps extends WithAuthUser {
  eventId: number;
  member: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
}

export const AddReviewModalForm = ({ eventId, user, member }: AddReviewModalFormProps) => {
  const disclosure = useDisclosure();
  const toast = useToast();

  const [addReviewRequest, addReviewRequestState] = useMutation(ADD_REVIEW, {
    refetchQueries: ['UnreviewedEventParticipants'],
    onQueryUpdated: async (observableQuery) => {
      await observableQuery.refetch();
    },
    onCompleted: () => {
      disclosure.onClose();
    },
    onError: () => {},
  });

  return (
    <ModalForm
      disclosure={disclosure}
      error={addReviewRequestState.error?.message}
      formProps={{
        defaultValues: initialValues,
        noValidate: true,
        onSubmit: (formValues: FormValues) => {
          void addReviewRequest({
            variables: {
              eventId,
              rating: formValues.rating,
              reviewerId: user.id,
              text: formValues.comment,
              userId: member.id,
            },
          });
          toast({
            variant: 'left-accent',
            status: 'success',
            position: 'top-right',
            title: 'Feedback sent!',
            description: 'Your feedback was sent successfully.',
            isClosable: true,
          });
        },
        resolver: zodResolver(schema),
      }}
      modalButtonText="Review"
      modalTitle="Feedback"
      modalDescription={
        <>
          Share your feedback for <Text as="b">{`${member.first_name} ${member.last_name}`}</Text>
        </>
      }
      submitButtonProps={{
        isLoading: addReviewRequestState.loading,
        text: 'Send',
      }}
    >
      <RatingSection />
      <TextareaField name="comment" label="Do you have any thoughts you’d like to share?" />
    </ModalForm>
  );
};

