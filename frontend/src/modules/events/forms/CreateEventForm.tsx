import { useMutation } from '@apollo/client';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { route } from '../../../route';
import { getEventFragmentData, WithAuthUser } from '../../../shared/types';
import { getCurrentDateTime } from '../../../utils/form';
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

export const CreateEventForm = ({ user }: WithAuthUser) => {
  const toast = useToast();
  const navigate = useNavigate();

  const [createEventRequest, createEventRequestState] = useMutation(CREATE_EVENT, {
    onCompleted: ({ createEvent }) => {
      toast({
        variant: 'left-accent',
        status: 'success',
        position: 'top-right',
        title: 'Event created!',
        description: 'Your event was created successfully.',
        isClosable: true,
      });

      const { id } = getEventFragmentData(createEvent);
      navigate(route.eventDetails(id));
    },
  });

  const currentDateTime = getCurrentDateTime();

  return (
    <EventForm
      user={user}
      defaultValues={{
        ...defaultValues,
        author: user.id,
        date: currentDateTime.slice(0, 10),
        startTime: currentDateTime.slice(11, 23),
        endTime: '',
      }}
      formTitle="Create event"
      formDescription="Create your own event today!"
      handleCancel={() => {
        navigate(route.events());
      }}
      handleSubmit={async (values) =>
        await createEventRequest({
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
              author_id: values.author === user.id ? values.author : undefined,
              group_id: values.author !== user.id ? values.author : undefined,
              event_type_ids: values.eventTypes.map(({ value }) => value),
            },
            location: {
              city: values.city,
              country: values.country,
              street_name: values.streetName,
              street_number: values.streetNumber,
            },
          },
        })
      }
      isLoading={createEventRequestState.loading}
      submitButtonLabel="Create"
    />
  );
};

