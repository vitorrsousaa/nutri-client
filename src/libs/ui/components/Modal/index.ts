import { ModalBody } from './components/Modal.Body';
import { ModalCloseButton } from './components/Modal.CloseButton';
import { ModalContent } from './components/Modal.Content';
import { ModalFooter } from './components/Modal.Footer';
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
