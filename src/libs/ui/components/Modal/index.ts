import { ModalBody, ModalFooter } from '@chakra-ui/react';

import { ModalCloseButton } from './components/Modal.CloseButton';
import { ModalContent } from './components/Modal.Content';
import { ModalHeader } from './components/Modal.Header';
import ModalUI from './Modal';

const Modal = {
  Root: ModalUI,
  Body: ModalBody,
  Header: ModalHeader,
  Footer: ModalFooter,
  Content: ModalContent,
  CloseButton: ModalCloseButton,
};

export default Modal;
