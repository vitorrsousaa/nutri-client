import { useMemo } from 'react';

import { CreateFoodDTO } from '@godiet-entities/planning/dtos/create-planning-meal-dto';
import { DataTotalType } from '@godiet-types/dataTotalType';
import calculateAttributes from '@godiet-utils/funcs/calculateAttributes';

import { useWatch } from 'react-hook-form';

import { DataChartType } from '../../types/dataChartType';

import { SummaryPlanningProps } from './SummaryPlanning';

export function useSummaryPlanningHook(props: SummaryPlanningProps) {
  const { control } = props;

  const meals = useWatch({
    control,
    name: 'meals',
  });

  const hasFoods = useMemo(
    () =>
      meals.some(
        (meal) =>
          meal.foods.length > 0 && meal.foods.every((food) => food.name !== '')
      ),
    [meals]
  );

  const dataFoods = useMemo<CreateFoodDTO[]>(
    () => meals.map((meal) => meal.foods).flat(),
    [meals]
  );

  const dataTable = useMemo<DataTotalType[]>(() => {
    return meals.map((meal, index) => {
      return {
        name: meal.name || `Refeição ${index + 1}`,
        carbohydrate: calculateAttributes<CreateFoodDTO>(
          'carbohydrate',
          meal.foods
        ),
        protein: calculateAttributes('protein', meal.foods),
        lipid: calculateAttributes('lipid', meal.foods),
        energy: calculateAttributes('energy', meal.foods),
      };
    });
  }, [meals]);

  const dataTableTotal = useMemo<DataTotalType>(
    () =>
      dataTable.reduce<DataTotalType>(
        (acc, dataTable) => {
          return {
            name: 'Total',
            carbohydrate: acc.carbohydrate + dataTable.carbohydrate,
            protein: acc.protein + dataTable.protein,
            lipid: acc.lipid + dataTable.lipid,
            energy: acc.energy + dataTable.energy,
          };
        },
        {
          name: 'Total',
          carbohydrate: 0,
          energy: 0,
          lipid: 0,
          protein: 0,
        } as DataTotalType
      ),
    [dataTable]
  );

  const dataChart = useMemo<DataChartType[]>(() => {
    const totalCarbohydrate = calculateAttributes('carbohydrate', dataFoods);
    const totalProtein = calculateAttributes('protein', dataFoods);
    const totalLipid = calculateAttributes('lipid', dataFoods);
    const totalEnergy = calculateAttributes('energy', dataFoods);

    return [
      {
        name: 'Carboidratos',
        value: Math.round(totalCarbohydrate),
        unit: 'g',
      },
      {
        name: 'Proteínas',
        value: Math.round(totalProtein),
        unit: 'g',
      },
      {
        name: 'Lipídios',
        value: Math.round(totalLipid),
        unit: 'g',
      },
      {
        name: 'Calorias',
        value: Math.round(totalEnergy),
        unit: 'kcal',
      },
    ];
  }, [dataFoods]);

  return {
    hasFoods,
    dataTable,
    dataChart,
    dataTableTotal,
  };
}
