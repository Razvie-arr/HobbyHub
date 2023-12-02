import { Flex, Stack } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { SliderField } from '../../../shared/forms';

import { StarRating } from './StarRating';

export const RatingSection = () => {
  const { watch } = useFormContext();
  const rating = watch('rating');
  return (
    <Stack>
      <SliderField name="rating" defaultValue={0} min={0} max={5} step={0.1} />
      <Stack direction="row" justifyContent="space-between" spacing={0}>
        <StarRating rating={rating} />
        <Flex
          borderColor="gray.300"
          borderWidth={1}
          borderRadius={4}
          fontSize="4xl"
          flexBasis="20%"
          justifyContent="center"
          alignItems="center"
        >
          {rating}
        </Flex>
      </Stack>
    </Stack>
  );
};

