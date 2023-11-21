import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '../../../../assets/styles/theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider(props: ThemeProviderProps) {
  return <ChakraProvider theme={theme}>{props.children}</ChakraProvider>;
}
