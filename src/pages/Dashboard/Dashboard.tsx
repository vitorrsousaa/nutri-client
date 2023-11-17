import { AddIcon } from '@chakra-ui/icons';
import { Center, HStack, Text, VStack } from '@chakra-ui/layout';

import Sidebar from '../../components/Sidebar';
import Button from '../../libs/ui/components/Button';
import Spinner from '../../libs/ui/components/Spinner';

import ModalCreatePatient from './components/ModalCreatePatient';
import { useDashboardHook } from './Dashboard.hook';

export function Dashboard() {
  const {
    modalCreatePatientIsOpen,
    isFetchingPatients,
    patients,
    name,
    navigate,
    toggleModalCreatePatient,
  } = useDashboardHook();

  return (
    <HStack width={'100%'} height={'100%'}>
      <Sidebar />
      <VStack padding={'24px 48px'} width={'100%'} height={'100%'}>
        <HStack width={'100%'}>
          <Text fontSize={'24px'} color={'#444'}>
            Olá,
          </Text>
          <Text fontWeight={500} fontSize={'24px'} color={'#444'}>
            {name}
          </Text>
        </HStack>
        <Center
          width={'100%'}
          height={'100%'}
          flexDirection={'column'}
          gap={'16px'}
        >
          {isFetchingPatients ? (
            <>
              <Spinner />
            </>
          ) : patients.length > 0 ? (
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
                  <Button onClick={() => navigate(`/patient/${patient.id}`)}>
                    Acessar informações
                  </Button>
                </div>
              ))}
            </>
          ) : (
            <>
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
            </>
          )}
        </Center>
      </VStack>

      <ModalCreatePatient
        isOpen={modalCreatePatientIsOpen}
        onClose={toggleModalCreatePatient}
      />
    </HStack>
  );
}
