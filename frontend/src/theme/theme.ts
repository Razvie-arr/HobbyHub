import '@fontsource/roboto'; // Defaults to weight 400

import { extendTheme } from '@chakra-ui/react';

import '@fontsource/roboto/100.css'; // Specify weight
import '@fontsource/roboto/300.css'; // Specify weight
import '@fontsource/roboto/400.css'; // Specify weight
import '@fontsource/roboto/500.css'; // Specify weight
import '@fontsource/roboto/700.css'; // Specify weight
import '@fontsource/roboto/900.css'; // Specify weight

export const theme = extendTheme({
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
});

