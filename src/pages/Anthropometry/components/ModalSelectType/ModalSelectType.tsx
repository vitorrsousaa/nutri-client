import Button from '@godiet-ui/Button';
import Modal from '@godiet-ui/Modal';
import Text from '@godiet-ui/Text';

export interface ModalSelectTypeProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalSelectType(props: ModalSelectTypeProps) {
  const { isOpen, onClose } = props;

  return (
    <Modal.Root isOpen={isOpen} onClose={onClose} isCentered>
      <Modal.Content>
        <Modal.Header>
          Selecione o tipo de antropometria
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Text color={'#666'} fontSize={'14px'}>
            Escolha o tipo de avalição que deseja fazer
          </Text>
          <Button>Adultos e idosos</Button>
          <Button>Crianças e adolescentes</Button>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
