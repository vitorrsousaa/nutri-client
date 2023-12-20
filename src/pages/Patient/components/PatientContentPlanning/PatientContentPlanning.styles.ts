import styled from 'styled-components';

export const PatientContainerMeal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: solid 1px #ccc;
  border-radius: 8px;
  padding: 16px;

  & + & {
    margin-top: 16px;
  }

  .small-text {
    font-size: 16px;
  }
`;
