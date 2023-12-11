import { ReactNode } from 'react';

import {
  ModalHeader as ChakraModalHeader,
  ModalHeaderProps as ChakraModalHeaderProps,
} from '@chakra-ui/react';

export interface ModalHeaderProps extends ChakraModalHeaderProps {
  children: ReactNode;
}

export function ModalHeader(props: ModalHeaderProps) {
  const { children, ...modalProps } = props;

  return (
    <ChakraModalHeader
      {...modalProps}
      display="flex"
      justifyContent="space-between"
      padding={0}
    >
      {children}
    </ChakraModalHeader>
  );
}
