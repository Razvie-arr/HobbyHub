import { PropsWithChildren } from 'react';
import { Container, ContainerProps } from '@chakra-ui/react';

export const ContentContainer = ({ children, ...containerProps }: PropsWithChildren & ContainerProps) => (
  <Container maxWidth="8xl" mx="auto" {...containerProps}>
    {children}
  </Container>
);

