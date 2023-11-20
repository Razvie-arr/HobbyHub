import { Fragment, ReactNode } from 'react';
import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react';

import { Box } from 'src/shared/design-system';

import { ContentContainer } from '../../layout';

interface NoDataProps {
  description?: ReactNode;
  wrapInContentContainer?: boolean;
}

export const NoData = ({ description, wrapInContentContainer }: NoDataProps) => {
  const Wrapper = wrapInContentContainer ? ContentContainer : Fragment;
  return (
    <Wrapper {...(wrapInContentContainer ? { mt: '8' } : {})}>
      <Alert status="info" mb="8">
        <AlertIcon />
        <Box>
          <AlertTitle>No data found</AlertTitle>
          {description ? <AlertDescription>{description}</AlertDescription> : null}
        </Box>
      </Alert>
    </Wrapper>
  );
};

