import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Heading, TabPanel } from '@chakra-ui/react';

import { NoData } from 'src/shared/design-system';
import { QueryResult } from 'src/shared/layout';
import { renderGroupList } from 'src/shared/renderers';

import { createShowMoreHandler } from '../../../../utils/dataFetch';
import { USER_CREATED_GROUPS } from '../../queries';
import { WithUserProfile } from '../../types';

export const GroupsTabPanel = ({ userProfile }: WithUserProfile) => {
  const [noMoreResults, setNoMoreResults] = useState(false);

  const queryResult = useQuery(USER_CREATED_GROUPS, {
    variables: {
      userId: userProfile.id,
      offset: 0,
      limit: 4,
    },
  });

  return (
    <TabPanel px="0">
      <Heading fontSize="lg" p="2">
        Created by {userProfile.first_name} {userProfile.last_name}
      </Heading>
      <QueryResult
        queryName="userAdminGroups"
        queryResult={queryResult}
        render={renderGroupList((groups) => ({
          noMoreResults,
          handleShowMore: createShowMoreHandler({
            queryResult,
            queryName: 'userAdminGroups',
            offset: groups.length,
            onNoMoreResults: () => {
              setNoMoreResults(true);
            },
          }),
        }))}
        renderOnNoData={<NoData description="This user has no created groups." />}
      />
    </TabPanel>
  );
};

