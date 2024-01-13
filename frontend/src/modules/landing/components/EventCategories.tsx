import { PropsWithChildren } from 'react';
import { Box, Card, CardBody, Flex, Heading, Icon, Image, Text, VStack } from '@chakra-ui/react';
import { MdChevronRight } from 'react-icons/md';
import { To } from 'react-router-dom';

import { route } from '../../../route';
import { ReactRouterLink } from '../../../shared/navigation';

const EventCategoryLink = ({ children, to }: PropsWithChildren<{ to: To }>) => (
  <Text
    as={ReactRouterLink}
    to={to}
    fontSize="2xl"
    display="flex"
    justifyContent="center"
    alignItems="center"
    fontWeight="semibold"
  >
    {children}
    <Icon as={MdChevronRight} boxSize="8" />
  </Text>
);

export const EventCategories = () => (
  <Box>
    <VStack spacing={4} alignItems="start">
      <Heading as="h2" fontSize="5xl" lineHeight={1.5} fontWeight="normal">
        Explore activities
      </Heading>
      <Flex flexWrap="wrap" columnGap="16" justifyContent={{ base: 'center' }} w="100%">
        <Card w="30%">
          <Image objectFit="cover" src="/assets/sports2.gif" alt="Sports GIF" />
          <CardBody textAlign="center">
            <EventCategoryLink to={route.events()}>Sports</EventCategoryLink>
          </CardBody>
        </Card>
        <Card w="30%">
          <Image objectFit="cover" src="/assets/cards.gif" alt="Cards GIF" />
          <CardBody textAlign="center">
            <EventCategoryLink to={route.events()}>Games</EventCategoryLink>
          </CardBody>
        </Card>
        <Card w="30%">
          <Image objectFit="cover" src="/assets/galshir-dog-walker.gif" alt="Dog walking GIF" />
          <CardBody textAlign="center">
            <EventCategoryLink to={route.events()}>Others</EventCategoryLink>
          </CardBody>
        </Card>
      </Flex>
    </VStack>
  </Box>
);

