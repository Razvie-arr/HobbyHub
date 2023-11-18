import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import { NoData } from '../../../shared/design-system';
import { QueryResult } from '../../../shared/layout';
import { getGroupFragmentData } from '../../../shared/types';
import { GroupDetails } from '../components';
import { GROUP } from '../queries';

interface EventDetailsProps {
  groupId: number;
}

const GroupDetailsPage = ({ groupId }: EventDetailsProps) => {
  const eventQueryResult = useQuery(GROUP, {
    variables: { groupId },
  });

  return (
    <QueryResult
      queryResult={eventQueryResult}
      queryName="groupById"
      render={(groupFragment) => <GroupDetails group={getGroupFragmentData(groupFragment)} />}
      renderOnNoData={<NoData wrapInContentContainer />}
    />
  );
};

export const GroupDetailsPageContainer = () => {
  const param = useParams();

  return param.groupId ? <GroupDetailsPage groupId={parseInt(param.groupId)} /> : null;
};

