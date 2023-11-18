import { useQuery } from '@apollo/client';

import { DataList } from '../../../../shared/design-system/organisms/DataList';
import { QueryResult } from '../../../../shared/layout';
import { getGroupFragmentData, WithNullableAuthUser } from '../../../../shared/types';
import { SIMILAR_GROUPS } from '../../queries';

interface SimilarGroupsProps extends WithNullableAuthUser {
  groupId: number;
  city: string;
  eventTypeIds: number[];
}

export const SimilarGroups = ({ user, groupId, eventTypeIds, city }: SimilarGroupsProps) => {
  const similarEventsQueryResult = useQuery(SIMILAR_GROUPS, {
    variables: {
      groupId,
      eventTypeIds,
      city,
    },
  });
  return (
    <QueryResult
      queryResult={similarEventsQueryResult}
      queryName="similarGroups"
      render={(groupFragments) => (
        <DataList user={user} type="group" dataArray={groupFragments.map(getGroupFragmentData)} maxColumnCount={3} />
      )}
    />
  );
};

