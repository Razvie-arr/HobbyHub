import { type ReactNode } from 'react';
import * as React from 'react';
import {
  ButtonProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  ThemingProps,
} from '@chakra-ui/react';
import { type FieldValues } from 'react-hook-form';

import { Button, ErrorBanner, Stack, WithDisclosure } from 'src/shared/design-system';
import { Form, FormProps } from 'src/shared/forms';

import { SubmitButton, SubmitButtonProps } from './SubmitButton';

export interface ModalFormProps<TFieldValues extends FieldValues = FieldValues>
  extends React.PropsWithChildren,
    WithDisclosure {
  additionalButtons?: ReactNode;
  children: ReactNode;
  error?: string;
  formProps: Omit<FormProps<TFieldValues>, 'children'>;
  modalButtonText: ReactNode;
  modalButtonVariant?: ThemingProps<'Button'>['variant'];
  modalTitle: ReactNode;
  modalDescription?: ReactNode;
  submitButtonProps: SubmitButtonProps;
  modalButtonProps?: ButtonProps;
}

export const ModalForm = <TFieldValues extends FieldValues = FieldValues>({
  additionalButtons,
  children,
  disclosure,
  error,
  formProps,
  modalButtonText,
  modalButtonVariant,
  modalTitle,
  modalDescription,
  submitButtonProps,
  modalButtonProps,
}: ModalFormProps<TFieldValues>) => (
  <>
    <Button
      colorScheme="purple"
      variant={modalButtonVariant}
      size={{ base: 'sm', md: 'md' }}
      onClick={disclosure.onOpen}
      {...modalButtonProps}
    >
      {modalButtonText}
    </Button>
    <Modal isOpen={disclosure.isOpen} onClose={disclosure.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody px={6} pb={6}>
          <Stack spacing="3">
            {modalDescription ? <Text>{modalDescription}</Text> : null}
            <Form {...formProps}>
              <Stack spacing="3">
                {error ? <ErrorBanner title={error} /> : null}
                {children}
              </Stack>
              <SubmitButton {...submitButtonProps} />
              {additionalButtons ?? null}
            </Form>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  </>
);

