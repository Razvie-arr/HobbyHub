import { PropsWithChildren, ReactNode } from 'react';
import { Card, CardBody, Heading, Image, Link, Stack } from '@chakra-ui/react';
import { To } from 'react-router-dom';

import { DEFAULT_IMAGE_PATH } from '../../constants';
import { ReactRouterLink } from '../../navigation';

interface DataCardProps {
  simplified?: boolean;
  maxFlexBasis?: string;
  dataRoute: To;
  cardTag?: ReactNode;
  imageFilepath?: string | null;
  title: ReactNode;
  actionButton?: ReactNode;
}

export const DataCard = ({
  dataRoute,
  imageFilepath,
  title,
  actionButton,
  cardTag,
  children,
  simplified,
  maxFlexBasis = '24%',
}: PropsWithChildren<DataCardProps>) => (
  <Card
    flexGrow={{ base: 1, md: 0 }}
    flexBasis={{ '2xl': maxFlexBasis, lg: '32%', md: '48%' }}
    backgroundColor="white"
    mb={simplified ? '0' : '12'}
    shadow="sm"
    role="group"
    _hover={{ shadow: 'md' }}
    transition="0.1s ease-in-out"
  >
    <Link to={dataRoute} as={ReactRouterLink} _groupHover={{ textDecoration: 'none' }} h="100%">
      <CardBody p="0" display="flex" flexDirection="column" h="100%">
        {simplified ? null : (
          <>
            {cardTag}
            <Image
              aspectRatio="16/9"
              objectFit="cover"
              src={imageFilepath ?? DEFAULT_IMAGE_PATH}
              borderTopRadius="base"
              _groupHover={{ opacity: '0.7' }}
              transition="0.1s ease-in-out"
            />
          </>
        )}
        <Stack justifyContent="space-between" flex="1" spacing="2" p="4">
          <Stack>
            <Heading
              size="md"
              noOfLines={3}
              lineHeight="initial"
              _groupHover={{ textDecoration: 'underline' }}
              transition="0.1s ease-in-out"
            >
              {title}
            </Heading>
            {children}
          </Stack>
          {actionButton}
        </Stack>
      </CardBody>
    </Link>
  </Card>
);

