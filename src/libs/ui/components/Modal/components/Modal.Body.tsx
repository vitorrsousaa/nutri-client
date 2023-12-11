import { ReactNode } from 'react';

import {
  ModalBody as ChakraModalBody,
  ModalBodyProps as ChakraModalBodyProps,
} from '@chakra-ui/react';

export interface ModalBodyProps extends ChakraModalBodyProps {
  children: ReactNode;
}

export function ModalBody(props: ModalBodyProps) {
  const { children, ...modalProps } = props;

  return (
    <ChakraModalBody
      padding={0}
      gap={4}
      {...modalProps}
      display={'flex'}
      flexDirection={'column'}
    >
      {children}
    </ChakraModalBody>
  );
}
