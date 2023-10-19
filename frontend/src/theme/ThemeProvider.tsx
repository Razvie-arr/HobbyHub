import { ChakraProvider } from 'src/shared/design-system';

import { theme } from './theme';

import '@fontsource/roboto/100.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';

export const ThemeProvider = ({ children }: React.PropsWithChildren) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
);

