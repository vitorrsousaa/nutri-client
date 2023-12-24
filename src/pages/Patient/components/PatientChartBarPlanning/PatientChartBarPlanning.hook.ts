import { useCallback, useMemo } from 'react';

import { TMealFood } from '@godiet-entities/planning/TPlanningMeal';

import calculateAttributes from '../../../../utils/funcs/calculateAttributes';
import { DataChartType } from '../../types/dataChart';

import { PatientChartBarPlanningProps } from './PatientChartBarPlanning';

export function usePatientChartBarPlanningHook(
  props: PatientChartBarPlanningProps
) {
  const { planningMeal } = props;

  const dataFoods = useMemo<TMealFood[]>(
    () =>
      planningMeal
        ? planningMeal.meals.map((meal) => meal.mealFoods).flat()
        : [],
    [planningMeal]
  );

  const getTotalAttributes = useCallback(() => {
    const total =
      calculateAttributes<TMealFood>('carbohydrate', dataFoods) +
      calculateAttributes<TMealFood>('lipid', dataFoods) +
      calculateAttributes<TMealFood>('protein', dataFoods);

    return total;
  }, [dataFoods]);

  const getPercentage = useCallback(
    (attribute: keyof DataChartType): number => {
      const total = getTotalAttributes();

      const percentage =
        total > 0
          ? (calculateAttributes<TMealFood>(attribute, dataFoods) / total) * 100
          : 0;

      return Math.round(percentage);
    },
    [dataFoods, getTotalAttributes]
  );

  const dataChart = useMemo<DataChartType>(() => {
    return {
      carbohydrate: getPercentage('carbohydrate'),
      lipid: getPercentage('lipid'),
      protein: getPercentage('protein'),
    };
  }, [getPercentage]);

  return {
    dataChart,
  };
}
