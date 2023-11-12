import { useMutation, useQuery } from '@apollo/client';
import { Alert, AlertDescription, AlertIcon, AlertTitle, useToast } from '@chakra-ui/react';
import { Option, pipe } from 'effect';
import { useNavigate, useParams } from 'react-router-dom';
import { match } from 'ts-pattern';

import { route } from '../../../route';
import { ContentContainer, QueryResult } from '../../../shared/layout';
import { getEventFragmentData } from '../../../shared/types';
import { useAuth } from '../../auth';
import { DeleteEventButton } from '../components';
import { EDIT_EVENT } from '../mutations';
import { EVENT } from '../queries';

import { EventForm } from './EventForm';

export const EditEventFormContainer = () => {
  const { eventId } = useParams();
  return pipe(
    eventId,
    Option.fromNullable,
    Option.map(parseInt),
    Option.filter((value) => !isNaN(value)),
    Option.match({ onNone: () => null, onSome: (id) => <EditEventForm eventId={id} /> }),
  );
};

interface EditEventFormProps {
  eventId: number;
}

const EditEventForm = ({ eventId }: EditEventFormProps) => {
  const { user } = useAuth();

  const result = useQuery(EVENT, { variables: { eventId } });
  const [editEventRequest, editEventRequestState] = useMutation(EDIT_EVENT);

  const navigate = useNavigate();
  const toast = useToast();

  return (
    <QueryResult
      queryResult={result}
      render={(data) => {
        const eventFragment = data.eventById;

        if (!eventFragment) {
          return null;
        }

        const event = getEventFragmentData(eventFragment);

        const authorId = match(event.author)
          .with({ __typename: 'User' }, ({ id }) => id)
          .with({ __typename: 'Group' }, ({ admin }) => admin.id)
          .exhaustive();

        if (!user || user.id !== authorId) {
          return (
            <ContentContainer mt="16">
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>Not authorized!</AlertTitle>
                <AlertDescription>This is not your event, you cannot edit it.</AlertDescription>
              </Alert>
            </ContentContainer>
          );
        }

        const authorName = match(event.author)
          .with({ __typename: 'User' }, ({ first_name, last_name }) => `${first_name} ${last_name}`)
          .with({ __typename: 'Group' }, ({ name }) => name)
          .exhaustive();

        return (
          <EventForm
            additionalButton={<DeleteEventButton event={event} colorScheme="purple" flex={1} />}
            defaultImagePath={event.image_filepath}
            defaultValues={{
              author: authorName,
              allowWaitlist: event.allow_waitlist,
              capacity: event.capacity,
              city: event.location.city,
              country: event.location.country,
              endDatetime: event.end_datetime.slice(0, 16),
              name: event.name,
              startDatetime: event.start_datetime.slice(0, 16),
              streetName: event.location.street_name,
              streetNumber: event.location.street_number,
              summary: event.summary,
              // @ts-expect-error NonEmptyArray check
              eventTypes: event.event_types.map(({ id, name }) => ({ value: id, label: name })),
              eventImagePath: event.image_filepath,
              description: event.description ?? '',
            }}
            formDescription="Efficiently edit your events or gatherings."
            formTitle="Edit event"
            handleCancel={() => {
              navigate(route.eventDetails(eventId));
            }}
            handleSubmit={async (values) => {
              await editEventRequest({
                variables: {
                  event: {
                    id: eventId,
                    allow_waitlist: values.allowWaitlist,
                    capacity: values.capacity,
                    end_datetime: values.endDatetime,
                    name: values.name,
                    start_datetime: values.startDatetime,
                    summary: values.summary,
                    author_id: user?.id,
                    event_type_ids: values.eventTypes.map(({ value }) => value),
                    image_filepath: values.eventImagePath,
                    description: values.description,
                  },
                  location: {
                    id: event.location.id,
                    city: values.city,
                    country: values.country,
                    street_name: values.streetName,
                    street_number: values.streetNumber,
                  },
                },
              });
              toast({
                variant: 'left-accent',
                status: 'success',
                position: 'top-right',
                title: 'Event updated!',
                description: 'Your event was updated successfully.',
              });
              navigate(route.eventDetails(eventId));
            }}
            isLoading={editEventRequestState.loading}
            submitButtonLabel="Save"
          />
        );
      }}
    />
  );
};

