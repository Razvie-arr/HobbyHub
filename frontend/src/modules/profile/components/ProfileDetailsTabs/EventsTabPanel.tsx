import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Heading, TabPanel } from '@chakra-ui/react';

import { NoData } from 'src/shared/design-system';
import { QueryResult } from 'src/shared/layout';
import { renderEventList } from 'src/shared/renderers';

import { WithUserProfile } from '../../../../shared/types';
import { createShowMoreHandler } from '../../../../utils/dataFetch';
import { useAuth } from '../../../auth';
import { USER_CREATED_EVENTS } from '../../queries';

export const EventsTabPanel = ({ userProfile }: WithUserProfile) => {
  const [noMoreResults, setNoMoreResults] = useState(false);

  const { user } = useAuth();
  const isCurrentUser = user && user.id === userProfile.id;

  const queryResult = useQuery(USER_CREATED_EVENTS, {
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
        queryName="userCreatedEvents"
        queryResult={queryResult}
        render={renderEventList((events) => ({
          user,
          noMoreResults,
          handleShowMore: createShowMoreHandler({
            queryResult,
            queryName: 'userCreatedEvents',
            offset: events.length,
            onNoMoreResults: () => {
              setNoMoreResults(true);
            },
          }),
        }))}
        renderOnNoData={<NoData description="This user has no created events." />}
      />
    </TabPanel>
  );
};

