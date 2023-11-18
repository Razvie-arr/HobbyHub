import { Fragment } from 'react';
import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';

import { Box } from 'src/shared/design-system';

import { ContentContainer } from '../../layout';

interface NoDataProps {
  wrapInContentContainer?: boolean;
}

export const NoData = ({ wrapInContentContainer }: NoDataProps) => {
  const Wrapper = wrapInContentContainer ? ContentContainer : Fragment;
  return (
    <Wrapper mt="8">
      <Alert status="info" mb="8">
        <AlertIcon />
        <Box>
          <AlertTitle>No data found</AlertTitle>
        </Box>
      </Alert>
    </Wrapper>
  );
};

