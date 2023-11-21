import { Center, Flex, HStack, Text, VStack } from '@chakra-ui/layout';

import { TPatient } from '../../../../entities/patient/TPatient';
import Avatar from '../../../../libs/ui/components/Avatar';

import { useCardPatientHook } from './CardPatient.hook';

export interface CardPatientProps {
  patient: TPatient;
}

export function CardPatient(props: CardPatientProps) {
  const { patient } = props;

  const { formatedBirthDate } = useCardPatientHook(props);

  return (
    <Flex
      width={'342px'}
      padding={'16px'}
      borderRadius={'2px'}
      border={'1px solid #e9e9e9'}
      boxShadow={'0px 4px 4px 0px rgba(0,0,0,0.5)'}
      direction={'column'}
      gap={'12px'}
    >
      <HStack gap={'8px'}>
        <Avatar name={patient.name} />
        <VStack alignItems={'flex-start'}>
          <Text fontWeight={500}>{patient.name}</Text>
          <Text color={'#666'} fontSize={'12px'}>
            {formatedBirthDate}
          </Text>
        </VStack>
      </HStack>
      <Flex height={'2px'} width={'100%'} background={'#e9e9e9'} />
      <Center
        height={'42px'}
        width={'100%'}
        background={'#59BD5A'}
        color={'#fff'}
      >
        Ativo
      </Center>
    </Flex>
  );
}
