import { Fragment, ReactNode, useState } from 'react';
import { Alert, AlertDescription, AlertTitle, Image } from '@chakra-ui/react';

import { Box } from 'src/shared/design-system';

import { NO_RESULTS_IMAGE_PATH } from '../../../shared/constants';
import { ContentContainer } from '../../layout';

interface NoDataProps {
  noResultsImagePath?: string | null;
  description?: ReactNode;
  wrapInContentContainer?: boolean;
}

export const NoData = ({ description, wrapInContentContainer, noResultsImagePath }: NoDataProps) => {
  const Wrapper = wrapInContentContainer ? ContentContainer : Fragment;
  const [imageFilePath] = useState(noResultsImagePath ?? NO_RESULTS_IMAGE_PATH);
  return (
    <Wrapper {...(wrapInContentContainer ? { mt: '10' } : {})}>
      <Alert
        status="info"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="300px"
        colorScheme="gray"
      >
        <Image boxSize="200px" objectFit="contain" alt="No result" src={imageFilePath ?? NO_RESULTS_IMAGE_PATH} />
        <Box>
          <AlertTitle>No data found</AlertTitle>
          {description ? <AlertDescription>{description}</AlertDescription> : null}
        </Box>
      </Alert>
    </Wrapper>
  );
};
