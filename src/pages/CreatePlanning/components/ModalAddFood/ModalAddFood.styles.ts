import styled from 'styled-components';

import COLORS from '../../../../constants/colors';

export const ModalAddFoodContainerChart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .container-extra-legend {
    display: flex;
    align-items: center;

    .extra-legend {
      width: 14px;
      height: 10px;
      margin-right: 4px;
      background-color: ${() => COLORS['Calorias']};
    }

    .legend {
      font-size: 16px;
      font-weight: 500;
      color: ${() => COLORS['Calorias']};
    }
  }
`;
