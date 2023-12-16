import styled from 'styled-components';

export const MealFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  border: solid 1px #ccc;
  border-radius: 8px;
  padding: 16px;
  min-width: 520px;

  & + & {
    margin-top: 16px;
    padding-top: 16px;
    border-top: solid 1px #ccc;
  }

  .container-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const MealFormContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;
