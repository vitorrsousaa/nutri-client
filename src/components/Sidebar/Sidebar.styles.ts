import styled from 'styled-components';

export const SidebarContainer = styled.aside`
  width: 290px;
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;
  /* min-height: 100vh; */

  position: sticky;
  top: 0;
  height: 100vh;
  justify-content: space-between;
`;

export const SidebarContainerHeader = styled.header`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 150px;
  background-color: var(--chakra-colors-blue-900);
  padding: 24px 48px;
  align-items: flex-start;
`;

export const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border: solid 1px #e5e5e5;
  align-items: flex-start;
  justify-content: space-between;
`;

export const SidebarContentSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
  padding: 48px 0;
  align-items: flex-start;
`;

export const SidebarContentHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 24px;
`;
