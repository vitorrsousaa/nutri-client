import styled from 'styled-components';

import COLORS from '../../../../constants/colors';
import { DataChartType } from '../../types/dataChart';

export const PatientChartBarPlanning = styled.div.withConfig({
  shouldForwardProp: (props) => !['chart'].includes(props),
})<{ chart: DataChartType }>`
  height: 45px;
  width: 100%;
  display: flex;
  margin-bottom: 16px;

  .cell-chart {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 600;
  }

  .carbohydrate {
    background-color: ${COLORS.Carboidratos};
    width: ${({ chart }) => chart.carbohydrate}%;
  }

  .protein {
    background-color: ${COLORS.Proteínas};
    width: ${({ chart }) => chart.protein}%;
  }

  .lipid {
    background-color: ${COLORS.Lipídios};
    width: ${({ chart }) => chart.lipid}%;
  }
`;
