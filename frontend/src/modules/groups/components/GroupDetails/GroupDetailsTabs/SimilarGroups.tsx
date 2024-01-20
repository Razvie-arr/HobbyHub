import { useQuery } from '@apollo/client';

import { QueryResult } from '../../../../../shared/layout';
import { renderGroupList } from '../../../../../shared/renderers/renderGroupList';
import { getLocationFragmentData, WithGroup } from '../../../../../shared/types';
import { SIMILAR_GROUPS } from '../../../queries';

export const SimilarGroups = ({ group }: WithGroup) => (
  <QueryResult
    queryResult={useQuery(SIMILAR_GROUPS, {
      variables: {
        groupId: group.id,
        eventTypeIds: group.event_types.map(({ id }) => id),
        city: getLocationFragmentData(group.location).city,
      },
    })}
    queryName="similarGroups"
    render={renderGroupList({ maxColumnCount: 3 })}
    noDataDescription={`We found no groups similar to ${group.name}`}
  />
);

