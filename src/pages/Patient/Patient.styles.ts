import styled from 'styled-components';

import COLORS from '../../constants/colors';

import { DataChartType } from './Patient.hook';

export const PatientContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  align-items: flex-start;

  .header-planning {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
  }
  .has-planning {
    justify-content: space-between;
  }
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #f3f3f3;
  padding: 42px 16px;
`;

export const PatientChartBarPlanning = styled.div<{ chart: DataChartType }>`
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

export const PatientContainerLoadingPlanning = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  margin-top: 16px;
`;
