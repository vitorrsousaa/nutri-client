import Button from '../../../../libs/ui/components/Button';
import Modal from '../../../../libs/ui/components/Modal';

import { useModalDeletePatientHook } from './ModalDeletePatient.hook';

export interface ModalDeletePatientProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: string;
}

export function ModalDeletePatient(props: ModalDeletePatientProps) {
  const { isOpen, onClose } = props;

  const { handleDeletePatient, isDeletingPatient } =
    useModalDeletePatientHook(props);

  return (
    <Modal.Root isOpen={isOpen} onClose={onClose} isLoading={isDeletingPatient}>
      <Modal.Content>
        <Modal.Header color={'#E52E4D'}>
          Deletar um paciente
          <Modal.CloseButton isDisabled={isDeletingPatient} />
        </Modal.Header>
        Essa ação não pode ser desfeita!
        <Modal.Footer>
          <Button
            onClick={onClose}
            isDisabled={isDeletingPatient}
            variant="ghost"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleDeletePatient}
            isLoading={isDeletingPatient}
            variant="danger"
          >
            Deletar
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}
