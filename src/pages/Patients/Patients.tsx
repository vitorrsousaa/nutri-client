import ModalCreatePatient from '@godiet-components/ModalCreatePatient';

import { AddIcon } from '@chakra-ui/icons';

import AppProvider from '../../components/AppProvider';
import Button from '../../libs/ui/components/Button';
import Input from '../../libs/ui/components/Input';
import Text from '../../libs/ui/components/Text';

import PanelPatients from './components/PanelPatients';
import { usePatientsHook } from './Patients.hook';
import * as styled from './Patients.styles';

export function Patients() {
  const {
    patients,
    modalCreatePatientIsOpen,
    isFetchingPatients,
    toggleModalCreatePatient,
  } = usePatientsHook();

  return (
    <AppProvider
      className="patients"
      title="Pacientes"
      extraHeader={
        !isFetchingPatients && (
          <>
            {patients.length > 0 && <Input placeholder="Procurar pacientes" />}
            <Button
              leftIcon={<AddIcon />}
              paddingX={16}
              onClick={toggleModalCreatePatient}
            >
              Novo paciente
            </Button>
          </>
        )
      }
      isLoading={isFetchingPatients}
    >
      <>
        {patients.length > 0 ? (
          <>
            <PanelPatients />
          </>
        ) : (
          <styled.PatientsEmptyContainer>
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
          </styled.PatientsEmptyContainer>
        )}
      </>

      <ModalCreatePatient
        isOpen={modalCreatePatientIsOpen}
        onClose={toggleModalCreatePatient}
      />
    </AppProvider>
  );
}
