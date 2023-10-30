import { useEffect } from 'react';
import { Box, Button, Flex, HStack, Stack, useDisclosure, VStack } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { FaFilter, FaXmark } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';

import { SortType } from '../../gql/graphql';
import { getAddressName } from '../../utils/googleMaps';
import { eventTypes } from '../constants';
import { AddressInputField, DatePickerField, SelectField } from '../forms';
import { ContentContainer } from '../layout';

import { ActivityFilter } from './ActivityFilter';
import { useFilterSearchParams } from './hooks';

const inputProps = {
  bg: 'gray.200',
  borderRadius: 'full',
};

export interface MainFiltersValues {
  sports: number[];
  games: number[];
  other: number[];
  address: google.maps.places.PlaceResult | null;
  distance: string;
  dates: readonly [Date | null, Date | null];
  sortBy: SortType;
}

interface MainFiltersProps {
  defaultValues: MainFiltersValues;
  handleSubmit: (values: MainFiltersValues) => void;
}

export const MainFilters = ({ defaultValues, handleSubmit }: MainFiltersProps) => {
  const { setParams } = useFilterSearchParams();

  const methods = useForm({
    defaultValues,
  });

  const mobileNav = useDisclosure();
  const location = useLocation();

  const closeFilterMenu = mobileNav.onClose;
  useEffect(
    function closeFilterMenuOnLocationChange() {
      closeFilterMenu();
    },
    [location, closeFilterMenu],
  );

  return (
    <>
      <Box position="sticky" top={{ base: '57px', md: '67px' }} zIndex={1}>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(({ address, ...values }) => {
              if (address && 'name' in address) {
                setParams({ address: null, ...values });
                handleSubmit({ address: null, ...values });
              } else {
                setParams({ address, ...values });
                handleSubmit({ address, ...values });
              }
            })}
            noValidate
          >
            <VStack spacing="0" boxShadow="sm" mb="4">
              <Box bg="purple.100" w="100%">
                <ContentContainer p="6">
                  <Flex w="100%" justifyContent="center">
                    <HStack spacing="4">
                      <ActivityFilter label="Sports" fieldName="sports" eventTypes={eventTypes.sports} />
                      <ActivityFilter label="Games" fieldName="games" eventTypes={eventTypes.games} />
                      <ActivityFilter label="Other" fieldName="other" eventTypes={eventTypes.other} />
                    </HStack>
                  </Flex>
                </ContentContainer>
              </Box>
              <Box bg="purple.50" w="100%" py="6">
                <Button
                  alignSelf="right"
                  colorScheme="purple"
                  mx={4}
                  my={2}
                  variant="outline"
                  display={{ base: 'flex', lg: 'none' }}
                  rightIcon={mobileNav.isOpen ? <FaXmark /> : <FaFilter />}
                  onClick={mobileNav.onToggle}
                >
                  Filter
                </Button>
                <ContentContainer display={{ base: mobileNav.isOpen ? 'flex' : 'none', lg: 'flex' }}>
                  <Stack direction={{ base: 'column', lg: 'row' }} width="100%">
                    <AddressInputField
                      name="address"
                      formControlProps={{ flexBasis: { base: 'none', lg: '39%' } }}
                      defaultValue={
                        defaultValues.address ? getAddressName(defaultValues.address.address_components) : ''
                      }
                      borderRadius="full"
                      bg="gray.200"
                    />
                    <SelectField
                      name="distance"
                      formControlProps={{ flexBasis: '15%' }}
                      placeholder="Distance"
                      {...inputProps}
                    >
                      <option value="5">Within 5 km</option>
                      <option value="10">Within 10 km</option>
                      <option value="20">Within 20 km</option>
                      <option value="50">Within 50 km</option>
                      <option value="100">Within 100 km</option>
                      <option value="200">Within 200 km</option>
                      <option value="500">Within 500 km</option>
                    </SelectField>
                    <DatePickerField
                      name="dates"
                      formControlProps={{ flexBasis: { base: 'none', lg: '20%' } }}
                      datePickerProps={{
                        selectsRange: true,
                        isClearable: true,
                        placeholderText: 'Select dates',
                      }}
                      inputProps={inputProps}
                    />
                    <SelectField
                      name="sortBy"
                      formControlProps={{ flexBasis: { base: 'none', lg: '13%' } }}
                      placeholder="Sort by:"
                      {...inputProps}
                    >
                      <option value={SortType.Date}>Sort by: Date</option>
                      <option value={SortType.Distance}>Sort by: Distance</option>
                    </SelectField>
                    <Button
                      colorScheme="purple"
                      borderRadius="full"
                      width="100%"
                      flexBasis={{ base: 'none', lg: '10%' }}
                      type="submit"
                    >
                      Apply filters
                    </Button>
                  </Stack>
                </ContentContainer>
              </Box>
            </VStack>
          </form>
        </FormProvider>
      </Box>
    </>
  );
};

