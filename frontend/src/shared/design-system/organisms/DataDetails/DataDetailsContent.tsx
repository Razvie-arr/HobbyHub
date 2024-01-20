import { Image, Stack, VStack } from '@chakra-ui/react';

import { DEFAULT_IMAGE_PATH } from '../../../constants';
import { ContentContainer } from '../../../layout';

interface DataDetailsContentProps {
  imageFilepath?: string | null;
  tabs: JSX.Element;
  sideCard: JSX.Element;
}

export const DataDetailsContent = ({ imageFilepath, tabs, sideCard }: DataDetailsContentProps) => (
  <ContentContainer>
    <Stack spacing={4} justifyContent="space-between" direction={{ base: 'column-reverse', lg: 'row' }}>
      <VStack flexBasis="65%">
        <Image
          w="100%"
          aspectRatio="16/9"
          objectFit="cover"
          alt="Event Image"
          src={imageFilepath ?? DEFAULT_IMAGE_PATH}
        />
        {tabs}
      </VStack>
      {sideCard}
    </Stack>
  </ContentContainer>
);

