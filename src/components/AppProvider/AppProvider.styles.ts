import styled from 'styled-components';

export const AppProviderContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const AppProviderContent = styled.main`
  display: flex;
  flex-direction: column;
  padding: 24px 48px;
  flex: 1;
  gap: 16px;
`;

export const AppProviderEmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
