import { useAuth } from '../../hooks/useAuth';

import ModalCreatePatient from './components/ModalCreatePatient';
import { useDashboardHook } from './Dashboard.hook';

const patients = [
  {
    name: 'Paciente 1',
  },
  {
    name: 'Paciente 2',
  },
  {
    name: 'Paciente 3',
  },
];

export function Dashboard() {
  const { handleCloseModal, handleOpenModal, modalIsOpen } = useDashboardHook();

  const { signOut } = useAuth();

  return (
    <div>
      <button onClick={handleOpenModal}>Adicionar novo paciente</button>
      <button onClick={signOut}>Logout</button>
      <strong>Dashboard</strong>
      <div>
        {patients.map((patient) => (
          <div key={patient.name}>
            <strong>{patient.name}</strong>
          </div>
        ))}
      </div>

      <ModalCreatePatient isOpen={modalIsOpen} onClose={handleCloseModal} />
    </div>
  );
}
