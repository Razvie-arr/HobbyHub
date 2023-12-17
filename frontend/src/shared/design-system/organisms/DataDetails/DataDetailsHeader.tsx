import { ReactNode } from 'react';
import { ButtonGroup, Flex, Heading, HStack, Stack } from '@chakra-ui/react';

import { ContentContainer } from '../../../layout';

interface DataDetailsHeaderProps {
  title: ReactNode;
  actionButtons?: ReactNode;
}

export const DataDetailsHeader = ({ title, actionButtons }: DataDetailsHeaderProps) => (
  <Flex width="100%" bgColor="white" shadow="sm" position="sticky" top={{ base: '49px', md: '59px' }} zIndex={2} py={4}>
    <ContentContainer>
      <Stack justifyContent="space-between" bgColor="white" flexBasis="100%" direction={{ base: 'column', md: 'row' }}>
        <HStack>
          <Heading as="h1" size="lg">
            {title}
          </Heading>
        </HStack>
        <ButtonGroup>
          <Stack direction="row" alignItems="center" spacing="4">
            {actionButtons}
          </Stack>
        </ButtonGroup>
      </Stack>
    </ContentContainer>
  </Flex>
);

