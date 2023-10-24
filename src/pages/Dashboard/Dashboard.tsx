import { useNavigate } from 'react-router-dom';

import { useGetAllPatients } from '../../hooks/patients';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../libs/ui/components/Button';

import ModalCreatePatient from './components/ModalCreatePatient';
import { useDashboardHook } from './Dashboard.hook';

export function Dashboard() {
  const {
    modalCreatePatientIsOpen,
    handleCloseModalCreatePatient,
    handleOpenModalCreatePatient,
  } = useDashboardHook();

  const { signOut } = useAuth();

  const navigate = useNavigate();

  const { patients, isFetchingPatients } = useGetAllPatients();

  return (
    <div>
      <h1>Dashboard</h1>
      <Button onClick={handleOpenModalCreatePatient}>
        Adicionar novo paciente
      </Button>
      <Button onClick={signOut}>Logout</Button> <br />
      {!isFetchingPatients ? (
        <>
          <strong>{patients?.length} pacientes cadastrados</strong>
          <div>
            {patients?.map((patient) => (
              <div
                key={patient.name}
                style={{
                  padding: 8,
                  border: 'dashed 2px blue',
                  borderRadius: 8,
                  marginBottom: 8,
                }}
              >
                <strong>{patient.name}</strong> <br />
                <strong>{patient.email}</strong>
                <Button onClick={() => navigate(`/patient/${patient.id}`)}>
                  Acessar informações
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
    </div>
  );
}
