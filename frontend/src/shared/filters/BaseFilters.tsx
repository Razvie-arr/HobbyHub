import { PropsWithChildren, ReactNode, useEffect } from 'react';
import { Box, Button, HStack, Stack, useDisclosure } from '@chakra-ui/react';
import { FieldValues, FormProvider, useForm, UseFormProps, UseFormReset } from 'react-hook-form';
import { FaFilter, FaXmark } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';

import { eventTypes } from '../constants';
import { ContentContainer } from '../layout';

import { ActivityFilter } from './ActivityFilter';

export interface RenderProps<V extends FieldValues> {
  getFilterValues: () => V;
  reset: UseFormReset<V>;
}

interface BaseFiltersProps<V extends FieldValues> {
  defaultValues: UseFormProps<V>['defaultValues'];
  filterFields: ReactNode;
  handleSubmit: (values: V) => Promise<void>;
  createResetHandler: (renderProps: RenderProps<V>) => () => void;
  renderAddressBar: (renderProps: RenderProps<V>) => ReactNode;
  renderFilterPresets: (renderProps: RenderProps<V>) => ReactNode;
}

export const BaseFilters = <V extends FieldValues>({
  defaultValues,
  children,
  filterFields,
  handleSubmit,
  createResetHandler,
  renderAddressBar,
  renderFilterPresets,
}: PropsWithChildren<BaseFiltersProps<V>>) => {
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

  const handleFilterSubmit = async (values: V) => {
    await handleSubmit(values);
  };

  const handleFormSubmit = methods.handleSubmit(async ({ filterPreset, ...values }) => {
    //@ts-expect-error, 'Omit<V, "filterPreset"> & { filterPreset: string; }' is assignable to the constraint of type 'V', but 'V' could be instantiated with a different subtype of constraint 'FieldValues'.
    await handleFilterSubmit({ ...values, filterPreset: 'none' });
  });

  const renderProps = { getFilterValues: methods.getValues, reset: methods.reset };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleFormSubmit} noValidate>
        <Stack
          bg="white"
          position="sticky"
          top={{ base: '49px', md: '59px' }}
          zIndex={2}
          shadow="sm"
          py={{ base: '2', xl: '4' }}
          spacing={{ base: '0', xl: '4' }}
          direction="column"
        >
          <ContentContainer>{renderAddressBar(renderProps)}</ContentContainer>
          <Box w="100%">
            <Button
              alignSelf="right"
              colorScheme="purple"
              mx={4}
              my={2}
              variant="outline"
              display={{ base: 'flex', xl: 'none' }}
              rightIcon={mobileNav.isOpen ? <FaXmark /> : <FaFilter />}
              onClick={mobileNav.onToggle}
              size={{ base: 'sm', md: 'md' }}
            >
              Filter
            </Button>
            <ContentContainer display={{ base: mobileNav.isOpen ? 'flex' : 'none', xl: 'flex' }}>
              <Stack direction={{ base: 'column', xl: 'row' }} width="100%">
                <HStack>
                  <ActivityFilter label="Sports" fieldName="sports" eventTypes={eventTypes.sports} />
                  <ActivityFilter label="Games" fieldName="games" eventTypes={eventTypes.games} />
                  <ActivityFilter label="Other" fieldName="other" eventTypes={eventTypes.other} />
                </HStack>
                {filterFields}
                <Button
                  colorScheme="purple"
                  borderRadius="full"
                  width="100%"
                  flexBasis={{ base: 'none', lg: '9%' }}
                  type="submit"
                  size={{ base: 'sm', md: 'md' }}
                >
                  Apply filters
                </Button>
                <Button
                  color="purple.500"
                  borderRadius="full"
                  width="100%"
                  flexBasis={{ base: 'none', lg: '9%' }}
                  variant="unstyled"
                  onClick={createResetHandler(renderProps)}
                  size={{ base: 'sm', md: 'md' }}
                >
                  Reset filters
                </Button>
              </Stack>
            </ContentContainer>
          </Box>
        </Stack>
        <Box bg="gray.100" w="100%" my="4">
          <ContentContainer>
            <Stack direction="column" spacing={4}>
              {renderFilterPresets(renderProps)}
            </Stack>
          </ContentContainer>
        </Box>
        {children}
      </form>
    </FormProvider>
  );
};

