import styled from 'styled-components';

export const SignUpPageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;

  width: 100%;
  height: 100vh;

  .form-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 480px;
  }

  .form-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;

    width: 360px;

    padding: 32px;
    border: solid 1px #ddd;
    border-radius: 8px;

    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  }

  .form-cta-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }

  .image-container {
    width: 70%;
    background-color: #59bd5a;
  }
`;

export const SignUpFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;
