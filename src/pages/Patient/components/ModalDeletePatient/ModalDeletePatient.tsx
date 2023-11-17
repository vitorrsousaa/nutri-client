import Button from '../../../../libs/ui/components/Button';
import Modal from '../../../../libs/ui/components/Modal';

interface ModalDeletePatientProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}

export function ModalDeletePatient(props: ModalDeletePatientProps) {
  const { isOpen, onClose, onDelete, isDeleting } = props;

  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <Modal.Header>
          Deletar um paciente
          <Modal.CloseButton disabled={isDeleting} />
        </Modal.Header>
        Essa ação não pode ser desfeita!
        <Modal.Footer>
          <Button onClick={onClose} isDisabled={isDeleting}>
            Cancelar
          </Button>
          <Button onClick={onDelete} colorScheme="red" isLoading={isDeleting}>
            Deletar
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}
