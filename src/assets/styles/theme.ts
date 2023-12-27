import { extendTheme } from '@chakra-ui/react';
import { StyleConfig } from '@chakra-ui/theme-tools';

import { buttonTheme } from './components/button.theme';
import { tabsTheme } from './components/tabs.theme';

const componentsTheme: Record<string, StyleConfig> = {
  Button: buttonTheme,
  Tabs: tabsTheme,
  Text: {
    baseStyle: {
      color: '#111',
    },
  },
  Table: {
    variants: {
      simple: {
        th: {
          borderColor: '#ccc',
        },
        td: {
          borderColor: '#ccc',
        },
      },
    },
  },
};

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
    // global: {
    //   '#root': {
    //     height: '100vh',
    //   },
    // },
  },

  components: componentsTheme,
});
