import { PropsWithChildren, ReactNode, useEffect } from 'react';
import { Box, Button, HStack, Stack, useDisclosure } from '@chakra-ui/react';
import { FieldValues, FormProvider, useForm, UseFormProps, UseFormReset } from 'react-hook-form';
import { FaFilter, FaXmark } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';

import { eventTypes } from '../constants';
import { ContentContainer } from '../layout';

import { ActivityFilter } from './ActivityFilter';

const commonButtonProps = {
  colorScheme: 'purple',
  borderRadius: 'full',
  width: '100%',
  flexBasis: { base: 'none', lg: '9%' },
  size: { base: 'sm', md: 'md' },
};

interface BaseFiltersProps<V extends FieldValues> {
  defaultValues: UseFormProps<V>['defaultValues'];
  handleSubmit: (values: V) => Promise<void>;
  createResetHandler: (reset: UseFormReset<V>) => () => void;
  filterFields: ReactNode;
  addressFilterField: ReactNode;
  filterPresets: ReactNode;
}

export const BaseFilters = <V extends FieldValues>({
  children,
  defaultValues,
  handleSubmit,
  createResetHandler,
  filterFields: slotFilterFields,
  addressFilterField: slotAddressFilterField,
  filterPresets: slotFilterPresets,
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
          <ContentContainer>{slotAddressFilterField}</ContentContainer>
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
                {slotFilterFields}
                <Button {...commonButtonProps} type="submit">
                  Apply filters
                </Button>
                <Button {...commonButtonProps} variant="ghost" onClick={createResetHandler(methods.reset)}>
                  Reset filters
                </Button>
              </Stack>
            </ContentContainer>
          </Box>
        </Stack>
        <Box bg="gray.100" w="100%" my="4">
          <ContentContainer>
            <Stack direction="column" spacing={4}>
              {slotFilterPresets}
            </Stack>
          </ContentContainer>
        </Box>
        {children}
      </form>
    </FormProvider>
  );
};

