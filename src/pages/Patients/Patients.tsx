import { AddIcon } from '@chakra-ui/icons';
import { Center, HStack, Text, VStack } from '@chakra-ui/layout';

import Sidebar from '../../components/Sidebar';
import Button from '../../libs/ui/components/Button';
import Input from '../../libs/ui/components/Input';
import Spinner from '../../libs/ui/components/Spinner';

import { usePatientsHook } from './Patients.hook';

export function Patients() {
  const name = 'Fulano';

  const {
    patients,
    //  isFetchingPatients
  } = usePatientsHook();

  const isFetchingPatients = true;

  return (
    <HStack width={'100%'} height={'100%'}>
      <Sidebar />
      <VStack padding={'24px 48px'} width={'100%'} height={'100%'}>
        <VStack width={'100%'} height={'100%'}>
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
              Pacientes
            </Text>

            <HStack>
              {patients.length > 0 && (
                <Input placeholder="Procurar pacientes" />
              )}
              <Button leftIcon={<AddIcon />} paddingX={16}>
                Novo paciente
              </Button>
            </HStack>
          </HStack>
        </VStack>

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
          ) : (
            <strong>nao</strong>
          )}
        </Center>
      </VStack>
    </HStack>
  );
}
