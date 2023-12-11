import styled from 'styled-components';

export const MealFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  border: solid 1px #ccc;
  border-radius: 8px;
  padding: 16px;

  & + & {
    margin-top: 16px;
    padding-top: 16px;
    border-top: solid 1px #ccc;
  }
`;

export const MealFormContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;
