import { ReactNode } from 'react';

import {
  ModalContent as ChakraModalContent,
  ModalContentProps as ChakraModalContentProps,
} from '@chakra-ui/react';

export interface ModalContentProps extends ChakraModalContentProps {
  children: ReactNode;
}

export function ModalContent(props: ModalContentProps) {
  const { children, ...modalProps } = props;

  return (
    <ChakraModalContent {...modalProps} paddingX={4} paddingY={4}>
      {children}
    </ChakraModalContent>
  );
}
