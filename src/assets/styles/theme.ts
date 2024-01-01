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
  },

  components: componentsTheme,
});
