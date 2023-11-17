import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
  },

  colors: {
    blue: {
      '900': '#0F0F2C',
    },
  },

  styles: {
    global: {
      '#root': {
        height: '100vh',
      },
    },
  },
});
