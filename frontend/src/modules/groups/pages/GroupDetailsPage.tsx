import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

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
      render={(data) => {
        const groupFragment = data?.groupById;
        if (!groupFragment) {
          return null;
        }
        const group = getGroupFragmentData(groupFragment);

        return <GroupDetails group={group} />;
      }}
    />
  );
};

export const GroupDetailsPageContainer = () => {
  const param = useParams();

  return param.groupId ? <GroupDetailsPage groupId={parseInt(param.groupId)} /> : null;
};

