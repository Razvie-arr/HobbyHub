import { useMutation } from '@apollo/client';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { route } from '../../../route';
import { getCurrentDateTime } from '../../../utils/form';
import { useAuth } from '../../auth';
import { CREATE_EVENT } from '../mutations';

import { EventForm } from './EventForm';

interface SelectOption {
  value: number;
  label: string;
}

const defaultValues = {
  name: '',
  eventTypes: [] as unknown as [SelectOption, ...SelectOption[]],
  summary: '',
  capacity: 1,
  allowWaitlist: false,
  endDatetime: '',
  streetName: '',
  streetNumber: '',
  city: '',
  country: '',
  description: '',
};

export const CreateEventForm = () => {
  const { user } = useAuth();
  const [createEventRequest, createEventRequestState] = useMutation(CREATE_EVENT);
  const navigate = useNavigate();
  const toast = useToast();
  return (
    <EventForm
      defaultValues={{
        ...defaultValues,
        author: `${user?.first_name} ${user?.last_name}`,
        startDatetime: getCurrentDateTime(),
      }}
      formTitle="Create event"
      formDescription="Efficiently coordinate your events or gatherings."
      handleCancel={() => {
        navigate(route.home());
      }}
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
              event_type_ids: values.eventTypes.map(({ value }) => value),
              description: values.description,
            },
            location: {
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
          title: 'Event created!',
          description: 'Your event was created successfully.',
        });
        const id = result.data?.createEvent.id;
        if (id) {
          navigate(route.eventDetails(id));
        }
      }}
      isLoading={createEventRequestState.loading}
      submitButtonLabel="Create"
    />
  );
};

