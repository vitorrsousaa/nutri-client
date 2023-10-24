import Button from '../../../../libs/ui/components/Button';
import Modal from '../../../../libs/ui/components/Modal';

interface ModalDeletePatientProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalDeletePatient(props: ModalDeletePatientProps) {
  const { isOpen, onClose } = props;

  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <Modal.Header>
          Tem certeza que deseja deletar este paciente?
          <Modal.CloseButton />
        </Modal.Header>

        <Modal.Body>Esta ação não pode ser desfeita</Modal.Body>

        <Modal.Footer>
          <Button onClick={onClose}>Cancelar</Button>
          <Button>Deletar</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}
