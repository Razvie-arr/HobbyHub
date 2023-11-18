import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Flex, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';

import { DataList } from '../../../shared/design-system';
import { ContentContainer, QueryResult } from '../../../shared/layout';
import { getEventFragmentData, getGroupFragmentData } from '../../../shared/types';
import { useAuth } from '../../auth';
import { SearchInput } from '../components';
import { SEARCH_EVENTS, SEARCH_GROUPS } from '../queries';

export const SearchPage = () => {
  const { user } = useAuth();

  const [params] = useSearchParams();
  const searchValueQueryString = params.get('searchValue') as string;

  const [noMoreResults, setNoMoreResults] = useState(false);

  useEffect(() => {
    if (searchValueQueryString) {
      const queryOptions = {
        variables: {
          text: searchValueQueryString,
          limit: 8,
          offset: 0,
        },
      };
      void getSearchEventsResult(queryOptions);
      void getSearchGroupsResult(queryOptions);
    }
  }, []);

  const [getSearchEventsResult, searchEventsResultQueryState] = useLazyQuery(SEARCH_EVENTS);
  const [getSearchGroupsResult, searchGroupsResultQueryState] = useLazyQuery(SEARCH_GROUPS);

  return (
    <ContentContainer>
      <Stack mt={4} spacing={8}>
        <Flex>
          <SearchInput
            onSearch={async (searchValue) => {
              const queryOptions = {
                variables: {
                  text: searchValue,
                  limit: 8,
                  offset: 0,
                },
              };
              await getSearchEventsResult(queryOptions);
              await getSearchGroupsResult(queryOptions);
            }}
          />
        </Flex>
        <Tabs variant="solid-rounded" colorScheme="purple">
          <TabList>
            <Tab>Events</Tab>
            <Tab>Groups</Tab>
          </TabList>

          <TabPanels>
            <TabPanel px={0}>
              <QueryResult
                queryResult={searchEventsResultQueryState}
                queryName="searchEvents"
                render={(eventFragments) => {
                  const events = eventFragments.map(getEventFragmentData);
                  return (
                    <DataList
                      user={user}
                      type="event"
                      dataArray={eventFragments.map(getEventFragmentData)}
                      noMoreResults={noMoreResults}
                      handleShowMore={async () => {
                        const result = await searchEventsResultQueryState.fetchMore({
                          variables: {
                            offset: events.length,
                          },
                        });
                        if ((result.data.searchEvents.length ?? 0) === 0) {
                          setNoMoreResults(true);
                        }
                      }}
                    />
                  );
                }}
              />
            </TabPanel>
            <TabPanel>
              <QueryResult
                queryResult={searchGroupsResultQueryState}
                queryName="searchGroups"
                render={(groupFragments) => {
                  const groups = groupFragments.map(getGroupFragmentData);
                  return (
                    <DataList
                      user={user}
                      type="group"
                      dataArray={groups}
                      noMoreResults={noMoreResults}
                      handleShowMore={async () => {
                        const result = await searchGroupsResultQueryState.fetchMore({
                          variables: {
                            offset: groups.length,
                          },
                        });
                        if ((result.data.searchGroups.length ?? 0) === 0) {
                          setNoMoreResults(true);
                        }
                      }}
                    />
                  );
                }}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </ContentContainer>
  );
};

