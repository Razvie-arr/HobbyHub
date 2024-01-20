import { Button, Card, CardBody, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { FaMessage } from 'react-icons/fa6';

import { DEFAULT_IMAGE_PATH } from '../../../../../shared/constants';

export const MoreEventsLikeThisCard = () => (
  <Card
    flexGrow={{ base: 1, md: 0 }}
    flexBasis={{ '2xl': '32%', lg: '32%', md: '48%' }}
    backgroundColor="white"
    mb="12"
    role="group"
    shadow="sm"
    transition="0.1s ease-in-out"
  >
    <CardBody p="0" display="flex" flexDirection="column" h="100%">
      <Image aspectRatio="16/9" objectFit="cover" src={DEFAULT_IMAGE_PATH} borderTopRadius="base" />
      <Stack justifyContent="space-between" flex="1" spacing="2" p="4">
        <Stack>
          <Heading size="md" noOfLines={3} lineHeight="initial">
            Interested in more events like this?
          </Heading>
          <Text>
            Express your interest by clicking below and letting the organizer know you'd like something similar in the
            future!
          </Text>
        </Stack>
        <Button
          size="sm"
          rounded="full"
          background="blue.800"
          _hover={{ background: 'blue.700' }}
          color="white"
          leftIcon={<FaMessage />}
        >
          More events like this
        </Button>
      </Stack>
    </CardBody>
  </Card>
);

