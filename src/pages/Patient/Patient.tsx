import { Center, HStack, Text, VStack } from '@chakra-ui/layout';

import Sidebar from '../../components/Sidebar';
import Button from '../../libs/ui/components/Button';
import Spinner from '../../libs/ui/components/Spinner';

import ModalDeletePatient from './components/ModalDeletePatient';
import { usePatientHook } from './Patient.hook';

export function Patient() {
  const {
    modalDeleteIsOpen,
    toggleModalDeletePatient,
    handleDeletePatient,
    returnPage,
    // isFetchingPatient,
    patient,
    isDeletingPatient,
    redirectToCreatePlanning,
  } = usePatientHook();

  const isFetchingPatient = false;

  const name = 'Osborne';

  return (
    <>
      <HStack width={'100%'} height={'100%'}>
        <Sidebar />
        <VStack padding={'24px 48px'} width={'100%'} height={'100vh'}>
          <VStack width={'100%'}>
            <HStack width={'100%'}>
              <Text fontSize={'24px'} color={'#444'}>
                Olá,
              </Text>
              <Text fontWeight={500} fontSize={'24px'} color={'#444'}>
                {name}
              </Text>
            </HStack>

            <HStack width={'100%'} justifyContent={'space-between'}>
              <Text color={'#111'} fontSize={'32px'} fontWeight={600}>
                Paciente
              </Text>
            </HStack>
          </VStack>

          <Center
            width={'100%'}
            height={'100%'}
            flexDirection={'column'}
            gap={'16px'}
          >
            {isFetchingPatient ? (
              <>
                <Spinner />
              </>
            ) : (
              <>
                <strong>patient</strong>
                <h1>{patient?.name}</h1>

                <Button onClick={redirectToCreatePlanning}>
                  Criar planejamento alimentar
                </Button>
              </>
            )}
          </Center>
        </VStack>
      </HStack>

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
    </>
  );
}
