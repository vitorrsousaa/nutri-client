import { ReactNode } from 'react';
import {
  ModalHeader as ChakraModalHeader,
  ModalHeaderProps,
} from '@chakra-ui/react';

export interface IModalHeader extends ModalHeaderProps {
  children: ReactNode;
}

export function ModalHeader(props: IModalHeader) {
  const { children, ...modalProps } = props;

  return (
    <ChakraModalHeader
      display="flex"
      justifyContent="space-between"
      padding={0}
      marginBottom={4}
      {...modalProps}
    >
      {children}
    </ChakraModalHeader>
  );
}
