import styled from 'styled-components';

export const FoodFormContainerFood = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;

  border-radius: 4px;
  border: solid 1px #ccc;

  .container-edit-actions {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .container-name-food {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .pie-chart {
    margin-right: 8px;
  }
`;
