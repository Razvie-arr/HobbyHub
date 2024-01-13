import { Fragment } from 'react';

import { route } from 'src/route';
import { NO_RESULTS_IMAGE_PATH } from 'src/shared/constants';
import { Alert, AlertTitle, Box, Image } from 'src/shared/design-system';

import { ContentContainer } from '../../layout';
import { RouterLink } from '../atoms';

interface NotFoundProps {
  noResultsImagePath?: string | null;
  wrapInContentContainer?: boolean;
}

export function NotFoundPage({ wrapInContentContainer, noResultsImagePath }: NotFoundProps) {
  const Wrapper = wrapInContentContainer ? ContentContainer : Fragment;
  const imageFilePath = noResultsImagePath ?? NO_RESULTS_IMAGE_PATH;

  return (
    <Wrapper {...(wrapInContentContainer ? { mt: '8' } : {})}>
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
        <Image boxSize="200px" objectFit="contain" alt="No result" src={imageFilePath} />
        <Box>
          <AlertTitle>Page not found</AlertTitle>
          <Box>
            Please return to <RouterLink to={route.events()}>Home</RouterLink>.
          </Box>
        </Box>
      </Alert>
    </Wrapper>
  );
}

