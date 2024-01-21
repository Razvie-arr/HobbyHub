import { useMutation } from '@apollo/client';
import { useToast } from '@chakra-ui/react';
import { NonEmptyArray } from 'effect/ReadonlyArray';
import { useNavigate } from 'react-router-dom';

import { route } from '../../../route';
import { getGroupFragmentData, WithAuthUser } from '../../../shared/types';
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
  eventTypes: [] as unknown as NonEmptyArray<SelectOption>,
  summary: '',
  streetName: '',
  streetNumber: '',
  city: '',
  country: '',
  description: '',
};

export const CreateGroupForm = ({ user }: WithAuthUser) => {
  const { signIn, token } = useAuth();

  const toast = useToast();
  const navigate = useNavigate();

  const [createGroupRequest, createGroupRequestState] = useMutation(CREATE_GROUP, {
    onCompleted: ({ createGroup }) => {
      toast({
        variant: 'left-accent',
        status: 'success',
        position: 'top-right',
        title: 'Group created!',
        description: 'Your group was created successfully.',
        isClosable: true,
      });

      const createdGroup = getGroupFragmentData(createGroup);
      signIn({
        token,
        user: {
          ...user,
          groups: [...user.groups, createdGroup],
        },
      });

      navigate(route.groupDetails(createdGroup.id));
    },
  });

  return (
    <GroupForm
      defaultValues={{
        ...defaultValues,
      }}
      formTitle="Create group"
      formDescription="Create your own group today!"
      handleCancel={() => {
        navigate(route.groups());
      }}
      handleSubmit={async (values) =>
        await createGroupRequest({
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
        })
      }
      isLoading={createGroupRequestState.loading}
      submitButtonLabel="Create"
    />
  );
};

