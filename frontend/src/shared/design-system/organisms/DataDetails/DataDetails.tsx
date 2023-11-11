import { ReactNode } from 'react';
import { Image, Stack, VStack } from '@chakra-ui/react';

import { DEFAULT_EVENT_IMAGE_PATH } from '../../../constants';
import { ContentContainer } from '../../../layout';

import { DataDetailsCard } from './DataDetailsCard';
import { DataDetailsHeader } from './DataDetailsHeader';
import { DataDetailsTabs } from './DataDetailsTabs';
import { EventDataDetails, GroupDataDetails } from './types';

interface WithAdditionalTabs {
  additionalTabs?: Array<{ title: ReactNode; content: ReactNode }>;
}

export const DataDetails = ({
  additionalTabs,
  ...props
}: (EventDataDetails | GroupDataDetails) & WithAdditionalTabs) => (
  <Stack spacing="8">
    <DataDetailsHeader {...props} />
    <ContentContainer>
      <Stack spacing={4} justifyContent="space-between" direction={{ base: 'column-reverse', md: 'row' }}>
        <VStack flexBasis="65%">
          <Image
            w="100%"
            aspectRatio="16/9"
            objectFit="cover"
            alt="Event Image"
            src={props.data.image_filepath ?? DEFAULT_EVENT_IMAGE_PATH}
          />
          <DataDetailsTabs {...props} additionalTabs={additionalTabs} />
        </VStack>
        <DataDetailsCard {...props} />
      </Stack>
    </ContentContainer>
  </Stack>
);

