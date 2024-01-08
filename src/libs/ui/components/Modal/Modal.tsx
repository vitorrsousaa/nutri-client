import { ReactNode } from 'react';

import {
  Modal as ModalUI,
  ModalOverlay,
  ModalProps as ChakraModalProps,
} from '@chakra-ui/modal';

interface ModalProps
  extends Omit<ChakraModalProps, 'children' | 'closeOnOverlayClick'> {
  children: ReactNode;
  isLoading?: boolean;
}

export default function Modal(props: ModalProps) {
  const { children, isLoading, ...modalProps } = props;

  return (
    <ModalUI
      motionPreset="scale"
      {...modalProps}
      closeOnOverlayClick={!isLoading}
    >
      <ModalOverlay />

      {children}
    </ModalUI>
  );
}
