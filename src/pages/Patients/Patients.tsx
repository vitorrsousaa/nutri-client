import { AddIcon } from '@chakra-ui/icons';
import { Center, HStack, Text, VStack } from '@chakra-ui/layout';

import HeaderPage from '../../components/HeaderPage';
import Sidebar from '../../components/Sidebar';
import Button from '../../libs/ui/components/Button';
import Input from '../../libs/ui/components/Input';
import Spinner from '../../libs/ui/components/Spinner';

import PanelPatients from './components/PanelPatients';
import { usePatientsHook } from './Patients.hook';

export function Patients() {
  const { patients, isFetchingPatients, name } = usePatientsHook();

  return (
    <HStack width={'100%'} height={'100%'}>
      <Sidebar />
      <VStack padding={'24px 48px'} width={'100%'} height={'100vh'}>
        <HeaderPage username={name} title="Pacientes">
          {!isFetchingPatients && (
            <>
              {patients.length > 0 && (
                <Input placeholder="Procurar pacientes" />
              )}
              <Button leftIcon={<AddIcon />} paddingX={16}>
                Novo paciente
              </Button>
            </>
          )}
        </HeaderPage>

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
              <PanelPatients />
            </>
          ) : (
            <>
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
            </>
          )}
        </Center>
      </VStack>
    </HStack>
  );
}
