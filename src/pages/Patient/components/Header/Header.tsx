import { CalendarIcon, EmailIcon } from '@chakra-ui/icons';
import { Flex, HStack, Text, VStack } from '@chakra-ui/layout';

import { TPatient } from '../../../../entities/patient/TPatient';
import Avatar from '../../../../libs/ui/components/Avatar';

import { useHeaderHook } from './Header.hook';

export interface HeaderProps {
  patient: TPatient;
}

function Header(props: HeaderProps) {
  const { patient } = props;

  const { formatedBirthDate } = useHeaderHook(props);

  const { name, email } = patient;

  return (
    <Flex width={'100%'} gap={'24px'}>
      <VStack>
        <Avatar
          name={name}
          justifyContent={'center'}
          alignItems={'center'}
          gap="8px"
        />
        <Text fontSize={'24px'} fontWeight={500}>
          {name}
        </Text>
      </VStack>
      <VStack gap={'16px'} alignItems={'flex-start'}>
        <Text fontWeight={500}>Informações:</Text>
        <VStack gap={'4px'} alignItems={'flex-start'}>
          <HStack gap="8px">
            <CalendarIcon color={'#444'} />
            <Text fontWeight={500} color={'#444'}>
              {formatedBirthDate}
            </Text>
          </HStack>

          <HStack gap="8px">
            <EmailIcon color={'#444'} />
            <Text fontWeight={500} color={'#444'}>
              {email}
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </Flex>
  );
}

export default Header;
