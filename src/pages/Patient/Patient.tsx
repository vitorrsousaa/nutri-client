import { AttachmentIcon, InfoIcon } from '@chakra-ui/icons';
import { Center, Flex, HStack } from '@chakra-ui/layout';

import AppProvider from '../../components/AppProvider';
import HeaderPatient from '../../components/HeaderPatient';
import Text from '../../libs/ui/components/Text';

import ModalEditPatient from './ModalEditPatient';
import { usePatientHook } from './Patient.hook';
import * as styled from './Patient.styles';

export function Patient() {
  const {
    isFetchingPatient,
    patient,
    modalEditPatientIsOpen,
    redirectToCreatePlanning,
    toggleModalEditPatient,
  } = usePatientHook();

  // const isFetchingPatient = false;

  // const patient = null;

  // const patient: TPatient = {
  //   name: 'John Doe',
  //   birthDate: new Date('1999-01-01'),
  //   email: 'any_email@email.com',
  //   gender: 'MASC',
  //   height: 1.8,
  //   id: 'any_id',
  //   weight: 80,
  // };

  return (
    <AppProvider
      className="patient"
      title="Paciente"
      isLoading={isFetchingPatient}
      hasError={!patient}
      hasBackButton
      errorMessage={
        <>
          <Text as="small" color="#333" align={'center'}>
            Não foi possível encontrar esse paciente no nosso banco de dados
          </Text>
          <Text as="strong">Por favor, tente novamente!</Text>
        </>
      }
    >
      {patient && (
        <>
          <HeaderPatient patient={patient} />

          <Flex gap={'16px'} alignItems={'flex-start'} direction={'column'}>
            <Text fontWeight={500}>Escolha uma opção:</Text>
            <HStack>
              <styled.ActionButton onClick={toggleModalEditPatient}>
                <span>Avalição clínica</span>
                <InfoIcon color={'#111'} />
              </styled.ActionButton>
              <styled.ActionButton onClick={redirectToCreatePlanning}>
                <span>Planejamento alimentar</span>
                <AttachmentIcon color={'#111'} />
              </styled.ActionButton>
            </HStack>
          </Flex>

          <Flex
            gap={'16px'}
            alignItems={'flex-start'}
            direction={'column'}
            width={'100%'}
          >
            <Text fontWeight={500}>Planejamento alimentar:</Text>
            <Center>
              <Text color="#333" align={'center'}>
                O paciente {patient.name} ainda não possui planejamento
                alimentar! Clique no botão{' '}
                <Text fontWeight={700} color="##59BD5A" as="span">
                  “Planejamento alimentar”
                </Text>
                acima para cadastrar o planejamento alimentar.
              </Text>
            </Center>
          </Flex>

          <ModalEditPatient
            isOpen={modalEditPatientIsOpen}
            onClose={toggleModalEditPatient}
            patient={patient}
          />
        </>
      )}
    </AppProvider>
  );
}
