import { ReactNode } from 'react';
import { Button, Divider, Flex, Heading, Stack } from '@chakra-ui/react';
import { ReadonlyArray } from 'effect';
import { match } from 'ts-pattern';

import { Box, DataCard, NoData } from 'src/shared/design-system';

import { route } from '../../../route';
import { EventProps, GroupProps, WithNullableAuthUser } from '../../types';

interface CommonProps extends WithNullableAuthUser {
  title?: ReactNode;
  handleSeeAll?: () => void;
  maxColumnCount?: 4 | 3;
}

interface EventsDataList extends CommonProps {
  type: 'event';
  dataArray: Array<EventProps>;
}

interface GroupsDataList extends CommonProps {
  type: 'group';
  dataArray: Array<GroupProps>;
}

type DataListProps = EventsDataList | GroupsDataList;

export const DataList = ({ user, handleSeeAll, title, maxColumnCount = 4, ...other }: DataListProps) => {
  const commonCardProps = {
    user,
    maxFlexBasis: maxColumnCount === 4 ? '24%' : ' 32%',
  };
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
              See all events
            </Button>
          ) : null}
        </Stack>
        {title ? <Divider borderColor="purple.200" /> : null}
        {ReadonlyArray.isNonEmptyArray<unknown>(other.dataArray) ? (
          <Flex flexWrap="wrap" columnGap="4">
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
        ) : (
          <NoData />
        )}
      </Stack>
    </Box>
  );
};
