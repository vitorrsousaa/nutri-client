import { StyleConfig } from '@chakra-ui/theme-tools';

export const buttonTheme: StyleConfig = {
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
    danger: {
      bg: '#E52E4D',
      color: '#fff',
      _hover: {
        bg: '#E52E4D',
        opacity: 0.85,
        _disabled: {
          bg: '#E52E4D',
          opacity: 0.45,
        },
      },
      _disabled: {
        bg: '#E52E4D',
        opacity: 0.4,
        _hover: {
          bg: '#E52E4D',
          opacity: 0.45,
        },
      },
      _active: {
        bg: '#E52E4D',
        opacity: 1.7,
      },
    },
    ghost: {
      bg: '#ddd',
      color: '#111',
      _hover: {
        bg: '#ddd',
        opacity: 0.8,
        _disabled: {
          bg: '#ddd',
          opacity: 0.4,
        },
      },
      _disabled: {
        bg: '#ddd',
        opacity: 0.4,
      },
      _active: {
        bg: '#ccc',
      },
    },
    secondary: {
      bg: 'transparent',
      border: '2px solid #59BD5A',
      color: '#59BD5A',
      _hover: {
        bg: '#59BD5A40',
        _disabled: {
          bg: '#59BD5A50',
        },
      },
      _disabled: {
        bg: '#ccc',
      },
      _active: {
        bg: '#59BD5A80',
      },
    },
  },
};
