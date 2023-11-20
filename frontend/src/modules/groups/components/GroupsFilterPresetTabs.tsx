import { HStack } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { GroupSortType } from '../../../gql/graphql';
import { TabButton } from '../../../shared/design-system';
import { GroupFilterPreset, GroupFiltersValues } from '../../../shared/filters/types';
import { WithAuthUser } from '../../../shared/types';
import { getEventTypeIds } from '../../../utils/events';

interface GroupsFilterPresetTabsProps extends WithAuthUser {
  currentFilterPreset: GroupFilterPreset;
  handleFilterSubmit: (values: GroupFiltersValues) => Promise<void>;
}

export const GroupsFilterPresetTabs = ({
  user,
  currentFilterPreset,
  handleFilterSubmit,
}: GroupsFilterPresetTabsProps) => {
  const methods = useFormContext<GroupFiltersValues>();

  return (
    <HStack>
      <TabButton
        active={currentFilterPreset === 'nearby'}
        label="Nearby"
        handleClick={methods.handleSubmit(async ({ address }) => {
          const values = {
            filterPreset: 'nearby' as const,
            address,
            distance: '20',
            sports: [],
            games: [],
            other: [],
            sortBy: GroupSortType.Distance,
          };

          methods.reset(values);
          await handleFilterSubmit(values);
        })}
      />
      <TabButton
        active={currentFilterPreset === 'recommended'}
        label="Recommended"
        handleClick={methods.handleSubmit(async ({ address }) => {
          const values = {
            filterPreset: 'recommended' as const,
            address,
            distance: '20',
            sports: getEventTypeIds('Sports', user.event_types),
            games: getEventTypeIds('Games', user.event_types),
            other: getEventTypeIds('Other', user.event_types),
            sortBy: GroupSortType.Distance,
          };

          methods.reset(values);
          await handleFilterSubmit(values);
        })}
      />
    </HStack>
  );
};

