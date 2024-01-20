import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, Text } from '@chakra-ui/react';

import { Review, User } from '../../../gql/graphql';
import { route } from '../../../route';
import { DEFAULT_IMAGE_PATH } from '../../../shared/constants';
import { StarRating } from '../../../shared/design-system';
import { RouterLink } from '../../../shared/navigation';
import { WithEvent } from '../../../shared/types';

type ProfileReviewProps = Partial<WithEvent> &
  Pick<Review, 'rating' | 'text'> & {
    reviewer: Pick<User, 'email' | 'first_name' | 'id' | 'last_name'>;
  } & {
    avatarImage?: string;
  };

export const ProfileReview = ({ event, avatarImage, rating, reviewer, text }: ProfileReviewProps) => (
  <Card variant="elevated" size="xs" p="6">
    <CardHeader>
      <Flex>
        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
          <Avatar name={`${reviewer.first_name} ${reviewer.last_name}`} src={avatarImage ?? DEFAULT_IMAGE_PATH} />
          <Box ml="5px">
            <Heading size="sm">
              <RouterLink to={route.profile(reviewer.id)}>
                {reviewer.first_name} {reviewer.last_name}
              </RouterLink>{' '}
              {/*TODO: make it more beautiful*/}
              at {event ? <RouterLink to={route.eventDetails(event.id)}>{event.name}</RouterLink> : `event was deleted`}
            </Heading>
            <StarRating rating={rating} size="24px" />
          </Box>
        </Flex>
      </Flex>
    </CardHeader>
    <CardBody>
      <Text mt="10px">{text}</Text>
    </CardBody>
  </Card>
);
