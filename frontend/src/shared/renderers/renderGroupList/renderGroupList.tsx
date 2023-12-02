import { flow, ReadonlyArray } from 'effect';

import { DataList, DataListProps, DataMapButton } from '../../design-system';
import { getGroupFragmentData, GroupData } from '../../types';

import { GroupCard } from './GroupCard';

interface GroupListProps extends DataListProps {
  maxColumnCount?: 4 | 3;
  withMap?: boolean;
}

export const renderGroupList = (props: GroupListProps | ((events: Array<GroupData>) => GroupListProps)) =>
  flow(ReadonlyArray.map(getGroupFragmentData), (groups) => {
    const { maxColumnCount = 4, withMap, ...dataListProps } = typeof props === 'function' ? props(groups) : props;
    return (
      <>
        {withMap && ReadonlyArray.isNonEmptyArray(groups) ? (
          <DataMapButton
            type="multiple"
            data={groups}
            renderMarkerContent={(data) => <GroupCard group={data} simplified />}
          />
        ) : null}
        <DataList {...dataListProps}>
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} maxFlexBasis={maxColumnCount === 4 ? '24%' : ' 32%'} />
          ))}
        </DataList>
      </>
    );
  });

