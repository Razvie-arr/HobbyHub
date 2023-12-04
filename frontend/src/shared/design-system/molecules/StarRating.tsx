import { Box } from '@chakra-ui/react';

interface StarRatingProps {
  rating: number;
  size?: string;
}

export const StarRating = ({ rating, size = '48px' }: StarRatingProps) => (
  <Box display="inline-block" color="#D9D9D9" fontSize={size} margin="0" position="relative" padding="0">
    <Box
      color="#FFC746"
      padding="0"
      position="absolute"
      zIndex="1"
      display="flex"
      top="0"
      left="0"
      overflow="hidden"
      width={`${rating === 0 ? 0 : rating * (100 / 5)}%`}
    >
      <span>★</span>
      <span>★</span>
      <span>★</span>
      <span>★</span>
      <span>★</span>
    </Box>
    <Box padding="0" display="flex" zIndex="0">
      <span>★</span>
      <span>★</span>
      <span>★</span>
      <span>★</span>
      <span>★</span>
    </Box>
  </Box>
);

