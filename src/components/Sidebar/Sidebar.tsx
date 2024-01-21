import { routes } from '@godiet-routes';

import { Box, Text } from '@chakra-ui/layout';

import { useAuth } from '../../hooks/useAuth';

import SideItem from './components/SideItem';
import * as styled from './Sidebar.styles';

export function Sidebar() {
  const { signOut } = useAuth();

  return (
    <styled.SidebarContainer>
      <styled.SidebarContainerHeader>
        <div style={{ display: 'flex', gap: 0 }}>
          <Text color={'white'} fontSize={24}>
            go
          </Text>
          <Text color="#59BD5A" fontWeight={700} fontSize={24}>
            Diet
          </Text>
        </div>
      </styled.SidebarContainerHeader>

      <styled.SidebarContent>
        <styled.SidebarContentSection>
          <styled.SidebarContentHeader>
            <Text
              textTransform={'uppercase'}
              fontSize={'16px'}
              fontWeight={500}
              color={'#888'}
            >
              Menu
            </Text>
          </styled.SidebarContentHeader>
          <SideItem href={routes.dashboard}>Dashboard</SideItem>
          <SideItem href={routes.patients}>Pacientes</SideItem>
          <SideItem disabled>Check-Ins</SideItem>
        </styled.SidebarContentSection>
        <styled.SidebarContentSection>
          <styled.SidebarContentHeader>
            <Text
              textTransform={'uppercase'}
              fontSize={'16px'}
              fontWeight={500}
              color={'#888'}
            >
              sua conta
            </Text>
          </styled.SidebarContentHeader>
          <SideItem disabled>Configurações</SideItem>
          <Box
            onClick={(e) => {
              signOut();
              e.stopPropagation();
            }}
          >
            <SideItem>Log out</SideItem>
          </Box>
        </styled.SidebarContentSection>
      </styled.SidebarContent>
    </styled.SidebarContainer>
  );
}
