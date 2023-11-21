import { extendTheme } from '@chakra-ui/react';

import { tabsTheme } from './components/tab.styles';

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

  components: {
    Button: {
      baseStyle: {
        borderRadius: '2px',
        fontWeight: 'regular',
        fontSize: '16px',
      },
      variants: {
        solid: {
          bg: '#59BD5A',
          color: '#fff',
          _hover: {
            bg: '#59BD5A',
            opacity: 0.85,
            _disabled: {
              bg: '#ccc',
              opacity: 0.8,
            },
          },
          _disabled: {
            bg: '#ccc',
            opacity: 1,
          },
          _active: {
            bg: '#59BD5A',
            opacity: 1.7,
          },
        },
      },
    },
    Tabs: tabsTheme,
    Text: {
      baseStyle: {
        color: '#111',
      },
    },
  },
});
