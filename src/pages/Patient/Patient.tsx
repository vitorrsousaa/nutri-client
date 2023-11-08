import Button from '../../libs/ui/components/Button';

import ModalDeletePatient from './components/ModalDeletePatient';
import { usePatientHook } from './Patient.hook';

export function Patient() {
  const {
    modalDeleteIsOpen,
    toggleModalDeletePatient,
    handleDeletePatient,
    returnPage,
    isFetchingPatient,
    patient,
    isDeletingPatient,
    redirectToCreatePlanning,
  } = usePatientHook();

  return (
    <div>
      {isFetchingPatient ? (
        <>
          <strong>isLoading</strong>
        </>
      ) : (
        <>
          <Button onClick={returnPage}>Voltar</Button>
          <Button onClick={toggleModalDeletePatient}>Deletar</Button>
          <strong>patient</strong>
          <h1>{patient?.name}</h1>

          <Button onClick={redirectToCreatePlanning}>
            Criar planejamento alimentar
          </Button>
        </>
      )}

      <ModalDeletePatient
        isOpen={modalDeleteIsOpen}
        onClose={toggleModalDeletePatient}
        onDelete={handleDeletePatient}
        isDeleting={isDeletingPatient}
      />
    </div>
  );
}
