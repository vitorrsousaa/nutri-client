import { ReactNode } from 'react';

import {
  ModalFooter as ChakraModalFooter,
  ModalFooterProps as ChakraModalFooterProps,
} from '@chakra-ui/react';

export interface ModalProps extends ChakraModalFooterProps {
  children: ReactNode;
}

export function ModalFooter(props: ModalProps) {
  const { children, ...modalProps } = props;

  return (
    <ChakraModalFooter {...modalProps} padding={'16px 0 0 0'} gap={4}>
      {children}
    </ChakraModalFooter>
  );
}
