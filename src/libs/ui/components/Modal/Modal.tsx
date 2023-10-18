import { ReactNode } from 'react';
import { Modal as ModalUI, ModalOverlay, ModalProps } from '@chakra-ui/react';

interface IModalProps extends ModalProps {
  children: ReactNode;
}

export default function Modal(props: IModalProps) {
  const { isOpen, children, ...modalProps } = props;

  return (
    <ModalUI isOpen={isOpen} motionPreset="scale" {...modalProps}>
      <ModalOverlay />

      {children}
    </ModalUI>
  );
}
