import { extendTheme } from '@chakra-ui/react';
import { StyleConfig } from '@chakra-ui/theme-tools';

import {
  accordionTheme,
  buttonTheme,
  tableTheme,
  tabsTheme,
  textTheme,
} from './components';

const componentsTheme: Record<string, StyleConfig> = {
  Button: buttonTheme,
  Tabs: tabsTheme,
  Text: textTheme,
  Table: tableTheme,
  Accordion: accordionTheme,
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
    global: {
      h1: {
        fontSize: '32px',
        fontWeight: '600',
      },
      h2: {
        fontSize: '24px',
        fontWeight: '600',
      },
      h3: {
        fontSize: '18px',
        fontWeight: '600',
      },
      h4: {
        fontSize: '16px',
        fontWeight: '600',
      },
    },
  },

  components: componentsTheme,
});
