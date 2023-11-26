import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Flex, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';

import { ContentContainer, QueryResult } from '../../../shared/layout';
import { renderEventList, renderGroupList } from '../../../shared/renderers';
import { createShowMoreHandler } from '../../../utils/dataFetch';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                render={renderEventList((events) => ({
                  user,
                  noMoreResults,
                  handleShowMore: createShowMoreHandler({
                    queryResult: searchEventsResultQueryState,
                    queryName: 'searchEvents',
                    offset: events.length,
                    onNoMoreResults: () => {
                      setNoMoreResults(true);
                    },
                  }),
                  withMap: true,
                }))}
              />
            </TabPanel>
            <TabPanel>
              <QueryResult
                queryResult={searchGroupsResultQueryState}
                queryName="searchGroups"
                render={renderGroupList((groups) => ({
                  user,
                  noMoreResults,
                  handleShowMore: createShowMoreHandler({
                    queryResult: searchGroupsResultQueryState,
                    queryName: 'searchGroups',
                    offset: groups.length,
                    onNoMoreResults: () => {
                      setNoMoreResults(true);
                    },
                  }),
                  withMap: true,
                }))}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </ContentContainer>
  );
};

