import { AddIcon } from '@chakra-ui/icons';

import AppProvider from '../../components/AppProvider';
import ModalCreatePatient from '../../components/ModalCreatePatient';
import Button from '../../libs/ui/components/Button';
import Text from '../../libs/ui/components/Text';

import { useDashboardHook } from './Dashboard.hook';
import * as styled from './Dashboard.styles';

export function Dashboard() {
  const {
    modalCreatePatientIsOpen,
    isFetchingPatients,
    patients,
    navigate,
    toggleModalCreatePatient,
  } = useDashboardHook();

  return (
    <AppProvider
      className="dashboard"
      title="Dashboard"
      isLoading={isFetchingPatients}
    >
      <>
        {patients.length > 0 ? (
          <>
            <strong>{patients?.length} pacientes cadastrados</strong>
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
                <Button onClick={() => navigate(`/${patient.id}`)}>
                  Acessar informações
                </Button>
              </div>
            ))}
          </>
        ) : (
          <styled.DashboardEmptyContainer>
            <Button onClick={toggleModalCreatePatient} leftIcon={<AddIcon />}>
              Novo paciente
            </Button>

            <div>
              <Text
                align={'center'}
                width={'600px'}
                fontSize={'20px'}
                color={'#333'}
              >
                Você ainda não possui nenhum paciente cadastrado!
              </Text>
              <Text
                align={'center'}
                width={'620px'}
                fontSize={'20px'}
                color={'#333'}
              >
                Clique no botão{' '}
                <Text fontWeight={600} color="#59BD5A" as="strong">
                  “Novo Paciente”
                </Text>{' '}
                acima para cadastrar seu primeiro paciente.
              </Text>
            </div>
          </styled.DashboardEmptyContainer>
        )}
      </>

      <ModalCreatePatient
        isOpen={modalCreatePatientIsOpen}
        onClose={toggleModalCreatePatient}
      />
    </AppProvider>
  );
}
