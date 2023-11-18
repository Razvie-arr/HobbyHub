import { useMutation } from '@apollo/client';
import { Alert, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { route } from '../../../route';
import { useAuth } from '../../auth';
import { CREATE_GROUP } from '../mutations';

import { GroupForm } from './GroupForm';

interface SelectOption {
  value: number;
  label: string;
}

const defaultValues = {
  groupImage: null,
  name: '',
  eventTypes: [] as unknown as [SelectOption, ...SelectOption[]],
  summary: '',
  streetName: '',
  streetNumber: '',
  city: '',
  country: '',
  description: '',
};

export const CreateGroupForm = () => {
  const { user } = useAuth();
  const [createGroupRequest, createGroupRequestState] = useMutation(CREATE_GROUP);
  const navigate = useNavigate();
  const toast = useToast();

  if (!user) {
    return <Alert status="error">An error occurred. Please log in to create a group.</Alert>;
  }

  return (
    <GroupForm
      defaultValues={{
        ...defaultValues,
      }}
      formTitle="Create group"
      formDescription="Create your own group today!"
      handleCancel={() => {
        navigate(route.home());
      }}
      handleSubmit={async (values) => {
        const result = await createGroupRequest({
          variables: {
            group: {
              description: values.description,
              image_filepath: values.groupImagePath,
              name: values.name,
              summary: values.summary,
              admin_id: user?.id,
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
          title: 'Group created!',
          description: 'Your group was created successfully.',
        });
        const id = result.data?.createGroup.id;
        if (id) {
          navigate(route.groupDetails(id));
        }
      }}
      isLoading={createGroupRequestState.loading}
      submitButtonLabel="Create"
    />
  );
};
