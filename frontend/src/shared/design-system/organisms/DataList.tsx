import { PropsWithChildren, ReactNode } from 'react';
import { Button, Center, Divider, Flex, Heading, Stack } from '@chakra-ui/react';

import { Box } from 'src/shared/design-system';

export interface DataListProps {
  title?: ReactNode;
  noMoreResults?: boolean;
  handleShowMore?: () => void;
}

export const DataList = ({ title, noMoreResults, handleShowMore, children }: PropsWithChildren<DataListProps>) => (
  <Box>
    <Stack spacing="4">
      <Stack
        justifyContent="space-between"
        direction={{ base: 'column', lg: 'row' }}
        alignItems={{ base: 'start', lg: 'center' }}
      >
        {title ? <Heading as="h2">{title}</Heading> : null}
      </Stack>
      {title ? <Divider borderColor="purple.200" /> : null}
      <Flex flexWrap="wrap" columnGap="4" justifyContent={{ base: 'center', md: 'start' }}>
        {children}
      </Flex>
      {handleShowMore ? (
        <Center mb="16">
          <Button colorScheme="purple" isDisabled={noMoreResults} onClick={handleShowMore}>
            {noMoreResults ? 'No more results' : 'Show more'}
          </Button>
        </Center>
      ) : null}
    </Stack>
  </Box>
);

