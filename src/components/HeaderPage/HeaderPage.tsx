import { HStack, Text, VStack } from '@chakra-ui/layout';

interface HeaderPageProps {
  children?: React.ReactNode;
  username?: string;
  isLoading?: boolean;
  title: string;
}

type DefaultProps = Pick<HeaderPageProps, 'isLoading'>;

const defaultProps: DefaultProps = {
  isLoading: false,
};

type Props = HeaderPageProps & DefaultProps;

function HeaderPage(props: Props) {
  const { username, isLoading, title, children } = props;

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

          {!isLoading && Boolean(children) && <HStack>{children}</HStack>}
        </HStack>
      </VStack>
    </>
  );
}

HeaderPage.defaultProps = defaultProps;

export default HeaderPage;
