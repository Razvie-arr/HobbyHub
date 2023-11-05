import { useEffect } from 'react';
import { Box, Button, HStack, Stack, useDisclosure, VStack } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { FaFilter, FaXmark } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';

import { SortType } from '../../gql/graphql';
import { eventTypes } from '../constants';
import { DatePickerField, SelectField } from '../forms';
import { ContentContainer } from '../layout';

import { ActivityFilter } from './ActivityFilter';
import { AddressFilterBar } from './AddressFilterBar.tsx';
import { useFilterSearchParams } from './hooks';
import { MainFiltersValues } from './types';

const inputProps = {
  bg: 'gray.200',
  borderRadius: 'full',
};

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

  const handleFormSubmit = methods.handleSubmit(({ address, ...values }) => {
    if (address && 'name' in address) {
      setParams({ address: null, ...values });
      handleSubmit({ address: null, ...values });
    } else {
      setParams({ address, ...values });
      handleSubmit({ address, ...values });
    }
  });

  return (
    <FormProvider {...methods}>
      <Box position="sticky" top={{ base: '57px', md: '67px' }} zIndex={2}>
        <form onSubmit={handleFormSubmit} noValidate>
          <VStack spacing="0" mb="4" shadow="sm">
            <Box bg="purple.100" w="100%" py="4">
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
                  <HStack>
                    <ActivityFilter label="Sports" fieldName="sports" eventTypes={eventTypes.sports} />
                    <ActivityFilter label="Games" fieldName="games" eventTypes={eventTypes.games} />
                    <ActivityFilter label="Other" fieldName="other" eventTypes={eventTypes.other} />
                  </HStack>
                  <SelectField name="distance" formControlProps={{ flexBasis: '11%' }} {...inputProps}>
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
                    formControlProps={{ flexBasis: { base: 'none', lg: '17%' } }}
                    datePickerProps={{
                      selectsRange: true,
                      isClearable: true,
                      placeholderText: 'Select dates',
                      monthsShown: 2,
                      todayButton: 'Today',
                    }}
                    inputProps={inputProps}
                  />
                  <SelectField
                    name="sortBy"
                    formControlProps={{ flexBasis: { base: 'none', lg: '13%' } }}
                    {...inputProps}
                  >
                    <option value={SortType.Date}>Sort by: Date</option>
                    <option value={SortType.Distance}>Sort by: Distance</option>
                  </SelectField>
                  <Button
                    colorScheme="purple"
                    borderRadius="full"
                    width="100%"
                    flexBasis={{ base: 'none', lg: '9%' }}
                    type="submit"
                  >
                    Apply filters
                  </Button>
                  {methods.formState.isDirty ? (
                    <Button
                      color="purple.500"
                      borderRadius="full"
                      width="100%"
                      flexBasis={{ base: 'none', lg: '9%' }}
                      variant="unstyled"
                      onClick={() => {
                        methods.reset({
                          dates: [null, null],
                          distance: '20',
                          sortBy: SortType.Date,
                          sports: [],
                          games: [],
                          other: [],
                        });
                      }}
                    >
                      Reset filters
                    </Button>
                  ) : null}
                </Stack>
              </ContentContainer>
            </Box>
            <Box bg="gray.50" w="100%" py="4">
              <AddressFilterBar defaultValues={defaultValues} onAddressSelected={handleFormSubmit} />
            </Box>
          </VStack>
        </form>
      </Box>
    </FormProvider>
  );
};

