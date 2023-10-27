import { ReactNode } from 'react';
import { Stack, Text } from '@chakra-ui/react';

export interface FormStackProps {
  title: string;
  children: ReactNode;
}

export function FormStack({ title, children }: FormStackProps) {
  return (
    <Stack bg="white" borderRadius={5} p={6} pb={8} spacing={4}>
      <Text fontWeight="bold" fontSize="xl" color="purple.500">
        {title}
      </Text>
      {children}
    </Stack>
  );
}

