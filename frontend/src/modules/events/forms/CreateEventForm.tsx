import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { gql } from '../../../gql';
import { route } from '../../../route';
import { getCurrentDateTime } from '../../../utils/form';
import { useAuth } from '../../auth';

import { EventForm } from './EventForm';

interface SelectOption {
  value: string;
  label: string;
}

const defaultValues = {
  name: '',
  eventTypes: [] as unknown as [SelectOption, ...SelectOption[]],
  summary: '',
  capacity: 2,
  allowWaitlist: false,
  endDatetime: '',
  streetName: '',
  streetNumber: '',
  city: '',
  country: '',
};

const CREATE_EVENT = gql(`
  mutation CreateEvent($event: EventInput!, $location: LocationInputWithoutCoords!) {
    createEvent(event: $event, location: $location) {
      id
    }
  }
`);

export const CreateEventForm = () => {
  const { user } = useAuth();
  const [createEventRequest, createEventRequestState] = useMutation(CREATE_EVENT);
  const navigate = useNavigate();
  return (
    <EventForm
      defaultValues={{ ...defaultValues, startDatetime: getCurrentDateTime() }}
      formTitle="Create event"
      formDescription="Efficiently coordinate your events or gatherings."
      handleSubmit={async (values) => {
        const result = await createEventRequest({
          variables: {
            event: {
              allow_waitlist: values.allowWaitlist,
              capacity: values.capacity,
              end_datetime: values.endDatetime,
              name: values.name,
              start_datetime: values.startDatetime,
              summary: values.summary,
              author_id: user?.id,
            },
            location: {
              city: values.city,
              country: values.country,
              street_name: values.streetName,
              street_number: values.streetNumber,
            },
          },
        });
        const id = result.data?.createEvent.id;
        if (id) {
          navigate(route.editEvent(id));
        }
      }}
      isLoading={createEventRequestState.loading}
      submitButtonLabel="Create"
    />
  );
};

