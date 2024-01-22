import { useMutation, useQuery } from '@apollo/client';
import { useToast } from '@chakra-ui/react';
import { Option, pipe } from 'effect';
import { useNavigate, useParams } from 'react-router-dom';
import { match } from 'ts-pattern';

import { route } from '../../../route';
import { NotAuthorized } from '../../../shared/design-system';
import { QueryResult } from '../../../shared/layout';
import { getEventFragmentData, getLocationFragmentData, WithAuthUser } from '../../../shared/types';
import { DeleteEventButton } from '../components';
import { EDIT_EVENT } from '../mutations';
import { EVENT } from '../queries';

import { EventForm } from './EventForm';

export const EditEventFormContainer = ({ user }: WithAuthUser) => {
  const { eventId } = useParams();
  return pipe(
    eventId,
    Option.fromNullable,
    Option.map(parseInt),
    Option.filter((value) => !isNaN(value)),
    Option.match({ onNone: () => null, onSome: (id) => <EditEventForm user={user} eventId={id} /> }),
  );
};

interface EditEventFormProps extends WithAuthUser {
  eventId: number;
}

const EditEventForm = ({ user, eventId }: EditEventFormProps) => {
  const result = useQuery(EVENT, { variables: { eventId } });

  const toast = useToast();
  const navigate = useNavigate();

  const [editEventRequest, editEventRequestState] = useMutation(EDIT_EVENT, {
    onCompleted: () => {
      toast({
        variant: 'left-accent',
        status: 'success',
        position: 'top-right',
        title: 'Event updated!',
        description: 'Your event was updated successfully.',
        isClosable: true,
      });
      navigate(route.eventDetails(eventId));
    },
  });

  return (
    <QueryResult
      queryResult={result}
      queryName="eventById"
      render={(eventFragment) => {
        const event = getEventFragmentData(eventFragment);
        const location = getLocationFragmentData(event.location);

        const authorId = match(event.author)
          .with({ __typename: 'User' }, ({ id }) => id)
          .with({ __typename: 'Group' }, ({ admin }) => admin.id)
          .exhaustive();

        if (user.id !== authorId) {
          return <NotAuthorized description="This is not your event, you cannot edit it." wrapInContentContainer />;
        }

        return (
          <EventForm
            user={user}
            additionalButton={<DeleteEventButton event={event} colorScheme="purple" flex={1} />}
            defaultImagePath={event.image_filepath}
            defaultValues={{
              author: event.author.id,
              allowWaitlist: event.allow_waitlist,
              capacity: event.capacity,
              city: location.city,
              country: location.country,
              date: event.start_datetime.slice(0, 10),
              endTime: event.end_datetime.slice(11, 23),
              name: event.name,
              startTime: event.start_datetime.slice(11, 23),
              streetName: location.street_name,
              streetNumber: location.street_number,
              summary: event.summary,
              // @ts-expect-error NonEmptyArray check
              eventTypes: event.event_types.map(({ id, name }) => ({ value: id, label: name })),
              eventImagePath: '',
              description: event.description ?? '',
            }}
            formDescription="Efficiently edit your events or gatherings."
            formTitle="Edit event"
            handleCancel={() => {
              navigate(route.eventDetails(eventId));
            }}
            handleSubmit={async (values) =>
              await editEventRequest({
                variables: {
                  event: {
                    id: eventId,
                    allow_waitlist: values.allowWaitlist,
                    capacity: values.capacity,
                    end_datetime: `${values.date}T${values.endTime}`,
                    name: values.name,
                    start_datetime: `${values.date}T${values.startTime}`,
                    summary: values.summary,
                    author_id: values.author === user.id ? values.author : undefined,
                    group_id: values.author !== user.id ? values.author : undefined,
                    event_type_ids: values.eventTypes.map(({ value }) => value),
                    image_filepath: values.eventImagePath,
                    description: values.description,
                  },
                  location: {
                    id: location.id,
                    city: values.city,
                    country: values.country,
                    street_name: values.streetName,
                    street_number: values.streetNumber,
                  },
                },
              })
            }
            isLoading={editEventRequestState.loading}
            submitButtonLabel="Save"
          />
        );
      }}
    />
  );
};

