import { Card, Divider, Heading, Stack, Text, VStack } from '@chakra-ui/react';

import { DataMap } from '../DataMap';

import { DataRowItem } from './DataRowItem';
import { WithSideCardProps } from './types';

export const DataDetailsCard = ({ sideCardProps }: WithSideCardProps) => (
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
        <Heading fontSize="lg">{sideCardProps.title}</Heading>
        <Text>{sideCardProps.description}</Text>
      </Stack>
      <Divider />
      {sideCardProps.items.map(({ icon, content }, index) => (
        <DataRowItem key={index} icon={icon}>
          {content}
        </DataRowItem>
      ))}
      <DataMap type="single" data={sideCardProps.mapData} height="22.7vh" />
    </VStack>
  </Card>
);

