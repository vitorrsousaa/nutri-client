import { CalendarIcon, EmailIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { Flex, HStack, Text, VStack } from '@chakra-ui/layout';

import { TPatient } from '../../entities/patient/TPatient';
import Avatar from '../../libs/ui/components/Avatar';

import { useHeaderPatientHook } from './HeaderPatient.hook';

export interface HeaderPatientProps {
  patient: TPatient;
}

function Header(props: HeaderPatientProps) {
  const { patient } = props;

  const { formatedBirthDate } = useHeaderPatientHook(props);

  return (
    <Flex width={'100%'} gap={'24px'} alignItems={'center'}>
      <Avatar
        name={patient.name}
        justifyContent={'center'}
        alignItems={'center'}
        gap="8px"
      />

      <VStack gap={'4px'} alignItems={'flex-start'}>
        <HStack gap="8px">
          <InfoOutlineIcon color={'#444'} />
          <Text fontWeight={500} color={'#444'} as="span">
            {patient.name}
          </Text>
        </HStack>

        <HStack gap="8px">
          <CalendarIcon color={'#444'} />
          <Text fontWeight={500} color={'#444'}>
            {formatedBirthDate}
          </Text>
        </HStack>

        <HStack gap="8px">
          <EmailIcon color={'#444'} />
          <Text fontWeight={500} color={'#444'}>
            {patient.email}
          </Text>
        </HStack>
      </VStack>
    </Flex>
  );
}

export default Header;
