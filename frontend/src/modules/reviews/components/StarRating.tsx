import { Box } from '@chakra-ui/react';

export const StarRating = ({ rating }: { rating: number }) => (
  <Box
    display="inline-block"
    color="#D9D9D9"
    fontSize="48px"
    width="100%"
    margin="0"
    position="relative"
    padding="0"
    flexBasis="70%"
  >
    <Box
      color="#FFC746"
      padding="0"
      position="absolute"
      zIndex="1"
      display="flex"
      top="0"
      left="0"
      overflow="hidden"
      width={`${rating === 0 ? 0 : (70 / 5) * rating}%`}
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

