import { tabsAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
  // define the part you're going to style
  tab: {
    fontWeight: 'semibold',
    _selected: {
      color: '#59BD5A',
    },
  },
});

// export the component theme
export const tabsTheme = defineMultiStyleConfig({ baseStyle });
