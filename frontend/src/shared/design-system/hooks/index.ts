import { useDisclosure } from '@chakra-ui/react';

export { useDisclosure, useToken } from '@chakra-ui/react';
export type Disclosure = ReturnType<typeof useDisclosure>;

export interface WithDisclosure {
  disclosure: Disclosure;
}

