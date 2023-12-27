import styled from 'styled-components';

export const LandingPageContainer = styled.main`
  .container-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 56px;
    border-bottom: 1px solid #ccc;

    div {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }

  .container-hero {
    background-color: #eee;
    margin: 24px 56px;
    padding: 48px;
  }
`;
