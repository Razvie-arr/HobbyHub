import { route } from '../../../../route';
import { Button, DataDetailsContainer, DataDetailsContent, DataDetailsHeader } from '../../../../shared/design-system';
import { ReactRouterLink } from '../../../../shared/navigation';
import { WithGroup } from '../../../../shared/types';
import { useAuth } from '../../../auth';
import { SendMessageModal } from '../../../messages';

import { GroupDetailsSideCard } from './GroupDetailsSideCard';
import { GroupDetailsTabs } from './GroupDetailsTabs';

export const GroupDetails = ({ group }: WithGroup) => {
  const { user } = useAuth();

  const owner = group.admin;

  const isUserOwner = user && user.id === owner.id;

  return (
    <DataDetailsContainer>
      <DataDetailsHeader
        title={group.name}
        actionButtons={
          isUserOwner ? (
            <>
              <Button as={ReactRouterLink} to={route.editGroup(group.id)} colorScheme="purple" rounded="full">
                Edit
              </Button>
            </>
          ) : user ? (
            <SendMessageModal user={user} recipient={owner} />
          ) : null
        }
      />
      <DataDetailsContent
        imageFilepath={group.image_filepath}
        sideCard={<GroupDetailsSideCard group={group} />}
        tabs={<GroupDetailsTabs group={group} user={user} />}
      />
    </DataDetailsContainer>
  );
};

