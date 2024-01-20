import { PropsWithChildren } from 'react';
import { Card, Divider, Heading, Stack, Text, VStack } from '@chakra-ui/react';

import { DataRowItem } from '../../molecules';
import { DataMap } from '../DataMap';

import { DateDetailsCardProps } from './types';

export const DataDetailsCard = ({
  children,
  description,
  items,
  mapData,
  title,
}: PropsWithChildren<DateDetailsCardProps>) => (
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
        <Heading fontSize="lg">{title}</Heading>
        <Text>{description}</Text>
      </Stack>
      <Divider />
      {items.map(({ icon, content }, index) => (
        <DataRowItem key={index} icon={icon}>
          {content}
        </DataRowItem>
      ))}
      <DataMap type="single" data={mapData} height="22.7vh" />
      {children}
    </VStack>
  </Card>
);

