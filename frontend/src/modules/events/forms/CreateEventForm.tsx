import { useMutation } from '@apollo/client';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { route } from '../../../route';
import { NotAuthorized } from '../../../shared/design-system';
import { getCurrentDateTime } from '../../../utils/form';
import { useAuth } from '../../auth';
import { CREATE_EVENT } from '../mutations';

import { EventForm } from './EventForm';

interface SelectOption {
  value: number;
  label: string;
}

const defaultValues = {
  eventImage: null,
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

  const currentDateTime = getCurrentDateTime();

  if (!user) {
    return <NotAuthorized requireSignIn />;
  }

  return (
    <EventForm
      defaultValues={{
        ...defaultValues,
        author: `${user?.first_name} ${user?.last_name}`,
        date: currentDateTime.slice(0, 10),
        startTime: currentDateTime.slice(11, 23),
        endTime: currentDateTime.slice(11, 23),
      }}
      formTitle="Create event"
      formDescription="Create your own event today!"
      handleCancel={() => {
        navigate(route.home());
      }}
      handleSubmit={async (values) => {
        const result = await createEventRequest({
          variables: {
            event: {
              allow_waitlist: values.allowWaitlist,
              capacity: values.capacity,
              description: values.description,
              end_datetime: `${values.date}T${values.endTime}`,
              image_filepath: values.eventImagePath,
              name: values.name,
              start_datetime: `${values.date}T${values.startTime}`,
              summary: values.summary,
              author_id: user?.id,
              event_type_ids: values.eventTypes.map(({ value }) => value),
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

