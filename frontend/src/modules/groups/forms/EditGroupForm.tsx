import { useMutation, useQuery } from '@apollo/client';
import { useToast } from '@chakra-ui/react';
import { Option, pipe } from 'effect';
import { useNavigate, useParams } from 'react-router-dom';

import { route } from '../../../route';
import { NotAuthorized } from '../../../shared/design-system';
import { QueryResult } from '../../../shared/layout';
import { getGroupFragmentData, getLocationFragmentData, WithAuthUser } from '../../../shared/types';
import { useAuth } from '../../auth';
import { EDIT_GROUP } from '../mutations';
import { GROUP } from '../queries';
import { DeleteGroupButton } from '../shared';

import { GroupForm } from './GroupForm';

export const EditGroupFormContainer = ({ user }: WithAuthUser) => {
  const { groupId } = useParams();
  return pipe(
    groupId,
    Option.fromNullable,
    Option.map(parseInt),
    Option.filter((value) => !isNaN(value)),
    Option.match({ onNone: () => null, onSome: (id) => <EditGroupForm user={user} groupId={id} /> }),
  );
};

interface EditGroupFormProps extends WithAuthUser {
  groupId: number;
}

const EditGroupForm = ({ user, groupId }: EditGroupFormProps) => {
  const result = useQuery(GROUP, { variables: { groupId } });

  const { signIn, token } = useAuth();

  const toast = useToast();
  const navigate = useNavigate();

  const [editGroupRequest, editGroupRequestState] = useMutation(EDIT_GROUP, {
    onCompleted: ({ editGroup }) => {
      toast({
        variant: 'left-accent',
        status: 'success',
        position: 'top-right',
        title: 'Group updated!',
        description: 'Your group was updated successfully.',
        isClosable: true,
      });

      const editedGroup = getGroupFragmentData(editGroup);
      signIn({
        token,
        user: {
          ...user,
          groups: [...user.groups.filter((group) => getGroupFragmentData(group).id !== editedGroup.id), editedGroup],
        },
      });

      navigate(route.groupDetails(groupId));
    },
  });

  return (
    <QueryResult
      queryResult={result}
      queryName="groupById"
      render={(groupFragment) => {
        const group = getGroupFragmentData(groupFragment);
        const location = getLocationFragmentData(group.location);

        if (user.id !== group.admin.id) {
          return <NotAuthorized description="This is not your group, you cannot edit it." wrapInContentContainer />;
        }

        return (
          <GroupForm
            additionalButton={<DeleteGroupButton group={group} colorScheme="purple" flex={1} />}
            defaultImagePath={group.image_filepath}
            defaultValues={{
              city: location.city,
              country: location.country,
              name: group.name,
              streetName: location.street_name,
              streetNumber: location.street_number,
              summary: group.summary,
              // @ts-expect-error NonEmptyArray check
              eventTypes: group.event_types.map(({ id, name }) => ({ value: id, label: name })),
              image_filepath: '',
              description: group.description ?? '',
            }}
            formDescription="Efficiently edit your group."
            formTitle="Edit group"
            handleCancel={() => {
              navigate(route.groupDetails(groupId));
            }}
            handleSubmit={async (values) =>
              await editGroupRequest({
                variables: {
                  group: {
                    id: groupId,
                    name: values.name,
                    summary: values.summary,
                    admin_id: user?.id,
                    event_type_ids: values.eventTypes.map(({ value }) => value),
                    image_filepath: values.groupImagePath,
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
            isLoading={editGroupRequestState.loading}
            submitButtonLabel="Save"
          />
        );
      }}
    />
  );
};

