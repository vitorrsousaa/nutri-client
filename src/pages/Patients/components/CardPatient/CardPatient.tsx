import { DeleteIcon } from '@chakra-ui/icons';
import { Center, Flex, HStack, Text, VStack } from '@chakra-ui/layout';

import { TPatient } from '../../../../entities/patient/TPatient';
import Avatar from '../../../../libs/ui/components/Avatar';
import Button from '../../../../libs/ui/components/Button';
import ModalDeletePatient from '../ModalDeletePatient';

import { useCardPatientHook } from './CardPatient.hook';

export interface CardPatientProps {
  patient: TPatient;
}

export function CardPatient(props: CardPatientProps) {
  const { patient } = props;

  const {
    formatedBirthDate,
    modalDeleteIsOpen,
    toggleModalDeletePatient,
    handleNavigateToPatient,
  } = useCardPatientHook(props);

  return (
    <>
      <Flex
        width={'342px'}
        padding={'16px'}
        borderRadius={'3px'}
        border={'1px solid #e9e9e9'}
        boxShadow={'0px 4px 4px 0px rgba(0,0,0,0.5)'}
        direction={'column'}
        gap={'12px'}
      >
        <HStack
          gap={'8px'}
          cursor={'pointer'}
          onClick={handleNavigateToPatient}
        >
          <Avatar name={patient.name} />
          <VStack alignItems={'flex-start'}>
            <Text fontWeight={500}>{patient.name}</Text>
            <Text color={'#666'} fontSize={'12px'}>
              {formatedBirthDate}
            </Text>
          </VStack>
        </HStack>
        <Flex height={'2px'} width={'100%'} background={'#e9e9e9'} />
        <div style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
          <Center
            height={'42px'}
            width={'100%'}
            background={'#59BD5A'}
            color={'#fff'}
          >
            Ativo
          </Center>
          <Button variant="danger" onClick={toggleModalDeletePatient}>
            <DeleteIcon />
          </Button>
        </div>
      </Flex>

      <ModalDeletePatient
        isOpen={modalDeleteIsOpen}
        onClose={toggleModalDeletePatient}
        patientId={patient.id}
      />
    </>
  );
}
