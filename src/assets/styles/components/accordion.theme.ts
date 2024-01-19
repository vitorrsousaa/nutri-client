import { StyleConfig } from '@chakra-ui/theme-tools';

export const accordionTheme: StyleConfig = {
  baseStyle: {
    container: {
      border: 'none',
      borderBottom: 'solid 1px',
      borderBottomColor: 'gray.200',
    },
    button: {
      justifyContent: 'space-between',
      fontSize: '18px',
      fontWeight: 500,
      textAlign: 'left',
      _hover: {
        backgroundColor: '#fff',
      },
    },
    icon: {
      fontSize: '28px',
    },
    panel: {
      fontWeight: 500,
      color: '#666',
    },
  },
};
