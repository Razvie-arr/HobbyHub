import { Stack } from '@chakra-ui/react';

import { SortType } from 'src/gql/graphql';
import { MainFilters } from 'src/shared/filters';
import { ContentContainer } from 'src/shared/layout';

import { GroupsSection } from '../components/GroupsSection/GroupsSection';

const groups = [
  {
    id: 1,
    name: 'skupina',
    admin: { id: 1, first_name: 'John', last_name: 'Doe' },
    capacity: 42,
  },
];

export const GroupsPage = () => (
  <>
    <MainFilters
      defaultValues={{
        address: null,
        dates: [null, null],
        distance: '20',
        games: [],
        other: [],
        sortBy: SortType.Date,
        sports: [],
      }}
      handleSubmit={async () => {}}
    />
    <ContentContainer>
      <Stack spacing="8">
        <GroupsSection groups={groups} />
      </Stack>
    </ContentContainer>
  </>
);
