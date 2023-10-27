import { useQuery } from '@apollo/client';
import { Option, pipe } from 'effect';
import { useParams } from 'react-router-dom';

import { gql } from '../../../gql';
import { QueryResult } from '../../../shared/layout';
import { toFragmentData } from '../fragments';

import { EventForm } from './EventForm';

const GET_EVENT = gql(`
  query EventById($id: Int!) {
    eventById(id: $id) {
      ...EventFragment
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
  const result = useQuery(GET_EVENT, { variables: { id: eventId } });
  return (
    <QueryResult
      queryResult={result}
      render={(data) => {
        const eventFragment = data.eventById;

        if (!eventFragment) {
          return null;
        }

        const event = toFragmentData(eventFragment);

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
              eventTypes: event.event_types.map(({ id, name }) => ({ value: id.toString(), label: name })),
            }}
            formDescription="Efficiently edit your events or gatherings."
            formTitle="Edit event"
            handleSubmit={async (values) => {
              const awaitedValues = await Promise.resolve(values);
              console.log(awaitedValues);
            }}
            isLoading={false}
            submitButtonLabel="Edit"
          />
        );
      }}
    />
  );
};

