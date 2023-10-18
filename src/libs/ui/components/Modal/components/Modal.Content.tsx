import { ReactNode } from 'react';
import {
  ModalContent as ChakraModalContent,
  ModalContentProps,
} from '@chakra-ui/react';

export interface IModalContent extends ModalContentProps {
  children: ReactNode;
}

export function ModalContent(props: IModalContent) {
  const { children, ...modalProps } = props;

  return (
    <ChakraModalContent paddingX={4} paddingY={4} {...modalProps}>
      {children}
    </ChakraModalContent>
  );
}
