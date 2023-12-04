import { AttachmentIcon, InfoIcon } from '@chakra-ui/icons';
import { Center, Flex, HStack, Text, VStack } from '@chakra-ui/layout';

import HeaderPage from '../../components/HeaderPage';
import Sidebar from '../../components/Sidebar';
import Spinner from '../../libs/ui/components/Spinner';

import Header from './components/Header';
import ModalDeletePatient from './components/ModalDeletePatient';
import { usePatientHook } from './Patient.hook';

export function Patient() {
  const {
    modalDeleteIsOpen,
    toggleModalDeletePatient,
    handleDeletePatient,
    isFetchingPatient,
    patient,
    isDeletingPatient,
    name,
    redirectToCreatePlanning,
  } = usePatientHook();

  // const isFetchingPatient = false;

  // const name = 'Osborne David';

  // const patient: TPatient = {
  //   name: 'John Doe',
  //   birthDate: new Date('1999-01-01'),
  //   email: 'any_email@email.com',
  //   gender: 'MASC',
  //   height: 1.8,
  //   id: 'any_id',
  //   weight: 80,
  // };

  // console.log(
  //   'Repetir o último texto várias vezes para verificar qual o comportamento da sidebar quando tiver um conteúdo com uma altura gradona'
  // );

  return (
    <>
      <HStack width={'100%'} height={'100%'}>
        <Sidebar />
        <VStack padding={'24px 48px'} width={'100%'} height={'100vh'}>
          <HeaderPage username={name} title="Paciente" />

          <Flex background={'#999'} height={'2px'} width={'100%'} />

          <VStack
            width={'100%'}
            height={'100%'}
            flexDirection={'column'}
            gap={'16px'}
            alignItems={'flex-start'}
          >
            {isFetchingPatient ? (
              <>
                <Spinner />
              </>
            ) : (
              <>
                <Header patient={patient} />

                <Flex
                  gap={'16px'}
                  alignItems={'flex-start'}
                  direction={'column'}
                >
                  <Text fontWeight={500}>Escolha uma opção:</Text>
                  <HStack>
                    <Flex
                      as="button"
                      padding={'42px 16px'}
                      gap={'10px'}
                      backgroundColor={'#F3F3F3'}
                      alignItems={'center'}
                    >
                      <span>Avalição clínica</span>
                      <InfoIcon color={'#111'} />
                    </Flex>
                    <Flex
                      as="button"
                      padding={'42px 16px'}
                      gap={'10px'}
                      backgroundColor={'#F3F3F3'}
                      alignItems={'center'}
                      onClick={redirectToCreatePlanning}
                    >
                      <span>Planejamento alimentar</span>
                      <AttachmentIcon color={'#111'} />
                    </Flex>
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
                      O paciente Theodory Western ainda não possui planejamento
                      alimentar! Clique no botão{' '}
                      <Text fontWeight={700} color="##59BD5A" as="span">
                        “Planejamento alimentar”
                      </Text>
                      acima para cadastrar o planejamento alimentar.
                    </Text>
                  </Center>
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
                      O paciente Theodory Western ainda não possui planejamento
                      alimentar! Clique no botão{' '}
                      <Text fontWeight={700} color="##59BD5A" as="span">
                        “Planejamento alimentar”
                      </Text>
                      acima para cadastrar o planejamento alimentar.
                    </Text>
                  </Center>
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
                      O paciente Theodory Western ainda não possui planejamento
                      alimentar! Clique no botão{' '}
                      <Text fontWeight={700} color="##59BD5A" as="span">
                        “Planejamento alimentar”
                      </Text>
                      acima para cadastrar o planejamento alimentar.
                    </Text>
                  </Center>
                </Flex>
              </>
            )}
          </VStack>
        </VStack>
      </HStack>

      <ModalDeletePatient
        isOpen={modalDeleteIsOpen}
        onClose={toggleModalDeletePatient}
        onDelete={handleDeletePatient}
        isDeleting={isDeletingPatient}
      />
    </>
  );
}
