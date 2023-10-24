import { useAuth } from '../../hooks/useAuth';
import Button from '../../libs/ui/components/Button';

import ModalCreatePatient from './components/ModalCreatePatient';
import ModalDeletePatient from './components/ModalDeletePatient';
import { useDashboardHook } from './Dashboard.hook';

export function Dashboard() {
  const {
    modalCreatePatientIsOpen,
    handleCloseModalCreatePatient,
    handleOpenModalCreatePatient,
    modalDeletePatientIsOpen,
    handleCloseModalDeletePatient,
    handleOpenModalDeletePatient,
    data,
    isLoading,
  } = useDashboardHook();

  const { signOut } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <Button onClick={handleOpenModalCreatePatient}>
        Adicionar novo paciente
      </Button>
      <Button onClick={signOut}>Logout</Button> <br />
      {!isLoading ? (
        <>
          <strong>{data?.length} pacientes cadastrados</strong>
          <div>
            {data?.map((patient) => (
              <div
                key={patient.name}
                style={{
                  padding: 8,
                  border: 'dashed 2px blue',
                  borderRadius: 8,
                }}
              >
                <strong>{patient.name}</strong> <br />
                <strong>{patient.email}</strong>
                <Button onClick={handleOpenModalDeletePatient}>
                  Deletar paciente
                </Button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <strong>Carregando...</strong>
      )}
      <ModalCreatePatient
        isOpen={modalCreatePatientIsOpen}
        onClose={handleCloseModalCreatePatient}
      />
      <ModalDeletePatient
        isOpen={modalDeletePatientIsOpen}
        onClose={handleCloseModalDeletePatient}
      />
    </div>
  );
}
