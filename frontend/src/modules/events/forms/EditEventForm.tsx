import { useMutation, useQuery } from '@apollo/client';
import { useToast } from '@chakra-ui/react';
import { Option, pipe } from 'effect';
import { useNavigate, useParams } from 'react-router-dom';

import { gql } from '../../../gql';
import { route } from '../../../route';
import { QueryResult } from '../../../shared/layout';
import { useAuth } from '../../auth';
import { getEventFragmentData } from '../fragments';

import { EventForm } from './EventForm';

const GET_EVENT = gql(`
  query EventById($id: Int!) {
    eventById(id: $id) {
      ...EventFragment
    }
  }
`);

const EDIT_EVENT = gql(`
  mutation EditEvent($event: EventInput!, $location: LocationInputWithoutCoords!) {
    editEvent(event: $event, location: $location) {
      id
    }
}
`);

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

  const result = useQuery(GET_EVENT, { variables: { id: eventId } });
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

        return (
          <EventForm
            defaultValues={{
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
                description: 'Your event was successfully updated.',
              });
              navigate(route.eventDetails(eventId));
            }}
            isLoading={editEventRequestState.loading}
            submitButtonLabel="Edit"
          />
        );
      }}
    />
  );
};

