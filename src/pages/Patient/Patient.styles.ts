import styled from 'styled-components';

export const PatientContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  align-items: flex-start;

  .header-planning {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
  }
  .has-planning {
    justify-content: space-between;
  }
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #f3f3f3;
  padding: 0 16px;

  max-width: 180px;
  height: 72px;
`;

export const PatientContainerLoadingPlanning = styled.div.withConfig({
  shouldForwardProp: (prop) => !['teste'].includes(prop),
})`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;
