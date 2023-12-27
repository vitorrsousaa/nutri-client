import styled from 'styled-components';

export const SummaryPlanningContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 100%;
  .container-chart-table {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }
  .container-empty-planning {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 24px;
  }

  .container-table-title-value {
    max-width: 220px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;
