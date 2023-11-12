import { PropsWithChildren } from 'react';
import { Container, ContainerProps } from '@chakra-ui/react';

export const ContentContainer = ({ children, ...containerProps }: PropsWithChildren & ContainerProps) => (
  <Container {...containerProps} maxWidth="8xl" mx="auto">
    {children}
  </Container>
);
