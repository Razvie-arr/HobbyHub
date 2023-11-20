import { ReactNode } from 'react';
import { Button, Center, Divider, Flex, Heading, Stack, useBreakpoint } from '@chakra-ui/react';
import { ReadonlyArray } from 'effect';
import { match } from 'ts-pattern';

import { Box, DataCard, DataMapButton, NoData } from 'src/shared/design-system';

import { route } from '../../../route';
import { EventData, GroupData, WithNullableAuthUser } from '../../types';

interface CommonProps extends WithNullableAuthUser {
  title?: ReactNode;
  handleSeeAll?: () => void;
  maxColumnCount?: 4 | 3;
  noMoreResults?: boolean;
  handleShowMore?: () => void;
}

interface EventsDataList extends CommonProps {
  type: 'event';
  dataArray: Array<EventData>;
}

interface GroupsDataList extends CommonProps {
  type: 'group';
  dataArray: Array<GroupData>;
}

type DataListProps = EventsDataList | GroupsDataList;

export const DataList = ({
  user,
  handleSeeAll,
  title,
  maxColumnCount = 4,
  noMoreResults,
  handleShowMore,
  ...other
}: DataListProps) => {
  const commonCardProps = {
    user,
    maxFlexBasis: maxColumnCount === 4 ? '24%' : ' 32%',
  };
  const breakpoint = useBreakpoint();
  return (
    <Box>
      <Stack spacing="4">
        <Stack
          justifyContent="space-between"
          direction={{ base: 'column', lg: 'row' }}
          alignItems={{ base: 'start', lg: 'center' }}
        >
          {title ? <Heading as="h2">{title}</Heading> : null}{' '}
          {handleSeeAll ? (
            <Button size="md" variant="link" colorScheme="purple" onClick={handleSeeAll}>
              See all {`${other.type}s`}
            </Button>
          ) : null}
        </Stack>
        {title ? <Divider borderColor="purple.200" /> : null}
        {ReadonlyArray.isNonEmptyArray<unknown>(other.dataArray) ? (
          <>
            <DataMapButton
              // @ts-expect-error, type error on non empty array check
              mapInfos={{ user, ...other }}
              position="fixed"
              bottom={{ base: '0', md: '8' }}
              right={{ base: '0', md: '8' }}
              iconOnly={breakpoint === 'base' || breakpoint === 'xs' || breakpoint === 'sm'}
            />
            <Flex flexWrap="wrap" columnGap="4" justifyContent={{ base: 'center', md: 'start' }}>
              {match(other)
                .with({ type: 'event' }, (props) =>
                  props.dataArray.map((data) => (
                    <DataCard
                      key={data.id}
                      {...commonCardProps}
                      type={props.type}
                      data={data}
                      detailRoute={route.eventDetails(data.id)}
                    />
                  )),
                )
                .with({ type: 'group' }, (props) =>
                  props.dataArray.map((data) => (
                    <DataCard
                      key={data.id}
                      {...commonCardProps}
                      type={props.type}
                      data={data}
                      detailRoute={route.groupDetails(data.id)}
                    />
                  )),
                )
                .exhaustive()}
            </Flex>
            {handleShowMore ? (
              <Center mb="16">
                <Button colorScheme="purple" isDisabled={noMoreResults} onClick={handleShowMore}>
                  {noMoreResults ? 'No more results: Try different filter values' : 'Show more'}
                </Button>
              </Center>
            ) : null}
          </>
        ) : (
          <NoData />
        )}
      </Stack>
    </Box>
  );
};

