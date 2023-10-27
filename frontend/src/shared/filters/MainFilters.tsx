import { useEffect } from 'react';
import { Box, Button, Flex, HStack, VStack } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';

import { getAddressName } from '../../utils/googleMaps';
import { AddressInputField, DatePickerField, SelectField } from '../forms';
import { useLngLatGeocoding } from '../hooks/useLngLatGeocoding';
import { ContentContainer } from '../layout';

import { useFilterSearchParams } from './hooks/useFilterSearchParams';
import { ActivityFilter } from './ActivityFilter';

const sports = [
  { name: 'Beach volleyball', id: 2 },
  { name: 'Volleyball', id: 4 },
  { name: 'Football', id: 1 },
  { name: 'Floorball', id: 17 },
  { name: 'Hockey', id: 3 },
  { name: 'Badminton', id: 18 },
  { name: 'Squash', id: 5 },
  { name: 'Biking', id: 16 },
  { name: 'Yoga', id: 7 },
  { name: 'Golf', id: 19 },
];

const games = [
  { name: 'Poker', id: 10 },
  { name: 'eGaming', id: 8 },
  { name: 'Board games', id: 9 },
];

const other = [
  { name: 'Walking', id: 6 },
  { name: 'Meet new people', id: 11 },
  { name: 'Hiking', id: 12 },
  { name: 'Ferata', id: 13 },
  { name: 'Walking the dog', id: 14 },
  { name: 'Strollering', id: 15 },
];

const inputProps = {
  bg: 'gray.200',
  borderRadius: 'full',
};

export const MainFilters = () => {
  const { params, setParams } = useFilterSearchParams();
  const location = useLngLatGeocoding({ lng: params.lng, lat: params.lat });

  const methods = useForm({
    defaultValues: {
      sports: params.sports,
      games: params.games,
      other: params.other,
      address: null,
      distance: '',
      dates: params.startDate && params.endDate ? [new Date(params.startDate), new Date(params.endDate)] : [],
      sortBy: params.sortBy,
    },
  });

  useEffect(() => {
    const values = methods.getValues();
    if (location && values.address === null) {
      // @ts-expect-error
      methods.setValue('address', location);
    }
  }, [location, methods]);

  return (
    <Box position="sticky" top="67px" zIndex={1}>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((values) => {
            setParams(values);
          })}
          noValidate
        >
          <VStack spacing="0" boxShadow="sm" mb="4">
            <Box bg="purple.100" w="100%">
              <ContentContainer p="6">
                <Flex w="100%" justifyContent="center">
                  <HStack spacing="4">
                    <ActivityFilter label="Sports" fieldName="sports" eventTypes={sports} />
                    <ActivityFilter label="Games" fieldName="games" eventTypes={games} />
                    <ActivityFilter label="Other" fieldName="other" eventTypes={other} />
                  </HStack>
                </Flex>
              </ContentContainer>
            </Box>
            <Box bg="purple.50" w="100%" py="6">
              <ContentContainer>
                <HStack>
                  <AddressInputField
                    name="address"
                    formControlProps={{ flexBasis: '39%' }}
                    defaultValue={location ? getAddressName(location.address_components) : ''}
                    borderRadius="full"
                    bg="gray.200"
                  />
                  <SelectField
                    name="distance"
                    formControlProps={{ flexBasis: '11%' }}
                    placeholder="Distance"
                    {...inputProps}
                  >
                    <option value="5">Within 5 km</option>
                    <option value="10">Within 10 km</option>
                    <option value="20">Within 20 km</option>
                    <option value="50">Within 50 km</option>
                    <option value="100">Within 100 km</option>
                  </SelectField>
                  <DatePickerField
                    name="dates"
                    formControlProps={{ flexBasis: '16%' }}
                    datePickerProps={{
                      selectsRange: true,
                      isClearable: true,
                      placeholderText: 'Select dates',
                    }}
                    inputProps={inputProps}
                  />
                  <SelectField
                    name="sortBy"
                    formControlProps={{ flexBasis: '13%' }}
                    placeholder="Sort by:"
                    {...inputProps}
                  >
                    <option value="date">Sort by: Date</option>
                    <option value="distance">Sort by: Distance</option>
                  </SelectField>
                  <Button colorScheme="purple" borderRadius="full" width="100%" flexBasis="10%" type="submit">
                    Apply filters
                  </Button>
                  <Button colorScheme="purple" flexBasis="10%" variant="link">
                    Reset filters
                  </Button>
                </HStack>
              </ContentContainer>
            </Box>
          </VStack>
        </form>
      </FormProvider>
    </Box>
  );
};

