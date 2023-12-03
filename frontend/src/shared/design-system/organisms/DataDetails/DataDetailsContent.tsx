import { Image, Stack, VStack } from '@chakra-ui/react';

import { DEFAULT_IMAGE_PATH } from '../../../constants';
import { ContentContainer } from '../../../layout';

import { DataDetailsCard } from './DataDetailsCard';
import { DataDetailsTabs } from './DataDetailsTabs';
import { WithSideCardProps, WithTabsProps } from './types';

interface DataDetailsContentProps extends WithTabsProps, WithSideCardProps {
  imageFilepath?: string | null;
}

export const DataDetailsContent = ({ imageFilepath, tabsProps, sideCardProps }: DataDetailsContentProps) => (
  <ContentContainer>
    <Stack spacing={4} justifyContent="space-between" direction={{ base: 'column-reverse', md: 'row' }}>
      <VStack flexBasis="65%">
        <Image
          w="100%"
          aspectRatio="16/9"
          objectFit="cover"
          alt="Event Image"
          src={imageFilepath ?? DEFAULT_IMAGE_PATH}
        />
        <DataDetailsTabs tabsProps={tabsProps} />
      </VStack>
      <DataDetailsCard sideCardProps={sideCardProps} />
    </Stack>
  </ContentContainer>
);

