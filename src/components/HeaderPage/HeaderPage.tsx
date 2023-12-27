import { HStack, Text, VStack } from '@chakra-ui/layout';

interface HeaderPageProps {
  children?: React.ReactNode;
  username?: string;
  title: string;
}

function HeaderPage(props: HeaderPageProps) {
  const { username, title, children } = props;

  return (
    <>
      <VStack width={'100%'}>
        <HStack width={'100%'}>
          <Text fontSize={'24px'} color={'#444'}>
            Olá,
          </Text>
          <Text fontWeight={500} fontSize={'24px'} color={'#444'}>
            {username}
          </Text>
        </HStack>

        <HStack width={'100%'} justifyContent={'space-between'}>
          <Text color={'#111'} fontSize={'32px'} fontWeight={600}>
            {title}
          </Text>

          {children && <HStack>{children}</HStack>}
        </HStack>
      </VStack>
    </>
  );
}

export default HeaderPage;
