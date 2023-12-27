import styled from 'styled-components';

export const CreatePlanningContainerMeals = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .container-meals {
    display: flex;
    gap: 24px;
    margin-bottom: 24px;
    width: 100%;
  }

  .container-cta-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
    flex-direction: center;
  }
`;

export const CreatePlanningContainerForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
