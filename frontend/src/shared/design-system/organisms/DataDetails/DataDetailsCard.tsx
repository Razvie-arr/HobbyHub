import { Card, Divider, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import { MdAccountCircle, MdCalendarToday, MdGroups, MdInfo, MdLocationOn } from 'react-icons/md';
import { match } from 'ts-pattern';

import { AddressInfo, EventDateTime, EventParticipants, EventTypeTag } from 'src/shared/design-system';

import { DataMap } from '../DataMap';

import { DataRowItem } from './DataRowItem';
import { DataDetailsProps } from './types';

export const DataDetailsCard = (props: DataDetailsProps) => (
  <Card
    p={4}
    boxShadow="lg"
    flexBasis="35%"
    top={{ md: '171px', base: 'auto' }}
    alignSelf={{ md: 'flex-start', base: 'auto' }}
    position={{ md: 'sticky', base: 'static' }}
  >
    <VStack alignItems="start" spacing={4} justifyContent="center">
      <Stack>
        <Heading fontSize="lg">Summary</Heading>
        <Text>{props.data.summary}</Text>
      </Stack>
      <Divider />
      <DataRowItem icon={MdAccountCircle}>
        <Text>
          {match(props)
            .with({ type: 'event' }, ({ data }) => (
              <>
                Hosted by:{' '}
                <Text as="b">
                  {data.author ? `${data.author.first_name} ${data.author.last_name}` : data.group?.name}
                </Text>
              </>
            ))
            .with({ type: 'group' }, ({ data }) => (
              <>
                Admin:{' '}
                <Text as="b">
                  {data.admin.first_name} {data.admin.last_name}
                </Text>
              </>
            ))
            .exhaustive()}
        </Text>
      </DataRowItem>
      <DataRowItem icon={MdInfo}>
        {props.data.event_types.map((eventType) => (
          <EventTypeTag key={eventType.id} eventType={eventType} />
        ))}
      </DataRowItem>
      {props.type === 'event' ? (
        <>
          <DataRowItem icon={MdGroups}>
            <EventParticipants
              noIcon
              fontSize="md"
              capacity={props.data.capacity}
              participants={props.data.participants}
            />
          </DataRowItem>
          <DataRowItem icon={MdCalendarToday}>
            <EventDateTime
              noIcon
              fontSize="md"
              startDateTime={props.data.start_datetime}
              endDateTime={props.data.end_datetime}
            />
          </DataRowItem>
        </>
      ) : null}
      <DataRowItem icon={MdLocationOn}>
        <AddressInfo noIcon fontSize="md" location={props.data.location} />
      </DataRowItem>
      <DataMap
        mapDataArray={match(props)
          .with({ type: 'event' }, ({ data, ...other }) => ({
            ...other,
            dataArray: [data] as const,
          }))
          .with({ type: 'group' }, ({ data, ...other }) => ({
            ...other,
            dataArray: [data] as const,
          }))
          .exhaustive()}
        height="22.7vh"
      />
    </VStack>
  </Card>
);

