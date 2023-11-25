import { useQuery } from '@apollo/client';

import { DataList } from '../../../../shared/design-system/organisms/DataList';
import { QueryResult } from '../../../../shared/layout';
import { getGroupFragmentData, WithGroup, WithNullableAuthUser } from '../../../../shared/types';
import { SIMILAR_GROUPS } from '../../queries';

interface SimilarGroupsProps extends WithNullableAuthUser, WithGroup {
  groupId: number;
  city: string;
  eventTypeIds: number[];
}

export const SimilarGroups = ({ user, group }: SimilarGroupsProps) => {
  const similarEventsQueryResult = useQuery(SIMILAR_GROUPS, {
    variables: {
      groupId: group.id,
      eventTypeIds: group.event_types.map(({ id }) => id),
      city: group.location.city,
    },
  });

  return (
    <QueryResult
      queryResult={similarEventsQueryResult}
      queryName="similarGroups"
      render={(groupFragments) => (
        <DataList user={user} type="group" dataArray={groupFragments.map(getGroupFragmentData)} maxColumnCount={3} />
      )}
      noDataDescription={`We found no groups similar to ${group.name}`}
    />
  );
};

