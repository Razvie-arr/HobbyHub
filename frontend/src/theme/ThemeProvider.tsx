import { ChakraProvider } from 'src/shared/design-system';

import { theme } from './theme';

export const ThemeProvider = ({ children }: React.PropsWithChildren) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
);

