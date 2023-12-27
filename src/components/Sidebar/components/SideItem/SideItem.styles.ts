import styled from 'styled-components';

export const SideItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 0 24px;
  align-items: flex-start;
  justify-content: space-between;

  &.active {
    border-right: 3px solid #59bd5a;
  }

  &.disabled {
    cursor: not-allowed;
  }
`;
