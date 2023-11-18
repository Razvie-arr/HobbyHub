import { PropsWithChildren, ReactNode, useEffect } from 'react';
import { Box, Button, HStack, Stack, useDisclosure } from '@chakra-ui/react';
import { FormProvider, useForm, UseFormReset } from 'react-hook-form';
import { FaFilter, FaXmark } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';

import { GroupSortType } from '../../gql/graphql';
import { eventTypes } from '../constants';
import { SelectField } from '../forms';
import { ContentContainer } from '../layout';

import { ActivityFilter } from './ActivityFilter';
import { DistanceSelectField } from './fields';
import { useFilterSearchParams } from './hooks';
import { GroupFiltersValues } from './types';

const inputProps = {
  bg: 'white',
  borderRadius: 'full',
};

export interface RenderProps {
  getFilterValues: () => GroupFiltersValues;
  handleFilterSubmit: (values: GroupFiltersValues) => Promise<void>;
  reset: UseFormReset<GroupFiltersValues>;
}

interface GroupFiltersProps {
  defaultValues: GroupFiltersValues;
  handleSubmit: (values: GroupFiltersValues) => Promise<void>;
  renderAddressBar: (renderProps: RenderProps) => ReactNode;
  renderFilterPresets: (renderProps: RenderProps) => ReactNode;
}

export const GroupFilters = ({
  defaultValues,
  handleSubmit,
  children,
  renderAddressBar,
  renderFilterPresets,
}: PropsWithChildren<GroupFiltersProps>) => {
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

  const handleFilterSubmit = async ({ address, ...values }: GroupFiltersValues) => {
    if (address && 'name' in address) {
      setParams({ address: null, ...values });
      await handleSubmit({ address: null, ...values });
    } else {
      setParams({ address, ...values });
      await handleSubmit({ address, ...values });
    }
  };

  const handleFormSubmit = methods.handleSubmit(async ({ filterPreset, ...values }) =>
    handleFilterSubmit({ ...values, filterPreset: 'none' }),
  );

  const renderProps = { getFilterValues: methods.getValues, handleFilterSubmit, reset: methods.reset };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleFormSubmit} noValidate>
        <Stack
          bg="white"
          position="sticky"
          top={{ base: '57px', md: '59px' }}
          zIndex={2}
          shadow="sm"
          py="4"
          spacing="4"
          direction="column"
        >
          <ContentContainer>{renderAddressBar(renderProps)}</ContentContainer>
          <Box bg="white" w="100%">
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
                <DistanceSelectField />
                <SelectField
                  name="sortBy"
                  formControlProps={{ flexBasis: { base: 'none', lg: '13%' } }}
                  {...inputProps}
                >
                  <option value={GroupSortType.Distance}>Sort by: Distance</option>
                  <option value={GroupSortType.Name}>Sort by: Name</option>
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
                        distance: '20',
                        sortBy: GroupSortType.Distance,
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
        </Stack>
        <Box bg="gray.100" w="100%" py="4">
          <ContentContainer>{renderFilterPresets(renderProps)}</ContentContainer>
        </Box>
        {children}
      </form>
    </FormProvider>
  );
};

