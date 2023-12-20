import { TPlanningMeal } from '@godiet-entities/planning/TPlanningMeal';

import { DataChartType } from '../../types/dataChart';

import { usePatientChartBarPlanningHook } from './PatientChartBarPlanning.hook';
import * as styled from './PatientChartBarPlanning.styles';

export interface PatientChartBarPlanningProps {
  planningMeal: TPlanningMeal;
}

export function PatientChartBarPlanning(props: PatientChartBarPlanningProps) {
  const { dataChart } = usePatientChartBarPlanningHook(props);

  return (
    <styled.PatientChartBarPlanning chart={dataChart}>
      {Object.keys(dataChart).map((key) => {
        const value = dataChart[key as keyof DataChartType];

        return (
          <div key={key} className={`cell-chart ${key}`}>
            {value > 1 && `${value}%`}
          </div>
        );
      })}
    </styled.PatientChartBarPlanning>
  );
}
