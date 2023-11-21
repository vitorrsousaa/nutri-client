import { Box, HStack, Text, VStack } from '@chakra-ui/layout';

import { useAuth } from '../../hooks/useAuth';

import SideItem from './components/SideItem';

export function Sidebar() {
  const { signOut } = useAuth();

  return (
    <VStack
      as={'aside'}
      width={250}
      height={'100vh'}
      gap={0}
      backgroundColor={'#F3F3F3'}
    >
      <VStack
        backgroundColor={'blue.900'}
        width={'100%'}
        paddingX={'24px'}
        paddingY={'48px'}
        alignItems={'flex-start'}
        as="header"
      >
        <HStack gap={0}>
          <Text color={'white'} fontSize={24}>
            go
          </Text>
          <Text color="#59BD5A" fontWeight={700} fontSize={24}>
            Diet
          </Text>
        </HStack>
      </VStack>

      <VStack
        justifyContent={'space-between'}
        alignItems={'flex-start'}
        width={'100%'}
        height={'100%'}
        border={'1px solid #E5E5E5'}
      >
        <VStack
          alignItems={'flex-start'}
          gap={'10px'}
          padding={'48px 0px'}
          width={'100%'}
        >
          <HStack padding={'0 24px'}>
            <Text
              textTransform={'uppercase'}
              fontSize={'16px'}
              fontWeight={500}
              color={'#888'}
            >
              Menu
            </Text>
          </HStack>
          <SideItem href="/dashboard">Dashboard</SideItem>
          <SideItem href="/pacientes">Pacientes</SideItem>
          <SideItem>Check-Ins</SideItem>
        </VStack>
        <VStack
          alignItems={'flex-start'}
          gap={'10px'}
          padding={'48px 0px'}
          width={'100%'}
        >
          <HStack padding={'0 24px'}>
            <Text
              textTransform={'uppercase'}
              fontSize={'16px'}
              fontWeight={500}
              color={'#888'}
            >
              sua conta
            </Text>
          </HStack>
          <SideItem href="/configuracoes">Configurações</SideItem>
          <Box
            onClick={(e) => {
              signOut();
              e.stopPropagation();
            }}
          >
            <SideItem>Log out</SideItem>
          </Box>
        </VStack>
      </VStack>
    </VStack>
  );
}
