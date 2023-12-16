import { useCallback, useMemo } from 'react';

import { CreateFoodDTO } from '@godiet-entities/planning/dtos/create-planning-meal-dto';

import { useWatch } from 'react-hook-form';

import { DataChartType } from '../../types/dataChartType';

import { SummaryPlanningProps } from './SummaryPlanning';

export interface DataTableType {
  name: string;
  carbohydrate: number;
  protein: number;
  lipid: number;
  energy: number;
}

export function useSummaryPlanningHook(props: SummaryPlanningProps) {
  const { control } = props;

  const meals = useWatch({
    control,
    name: 'meals',
  });

  const calculateAttributes = useCallback(
    (
      attribute: 'carbohydrate' | 'energy' | 'lipid' | 'protein' | 'quantity',
      data: CreateFoodDTO[]
    ) => {
      const total = data.reduce((acc, food) => {
        return acc + food[attribute];
      }, 0);

      return Math.round(total);
    },
    []
  );

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

  const dataTable = useMemo<DataTableType[]>(() => {
    return meals.map((meal, index) => {
      return {
        name: meal.name || `Refeição ${index + 1}`,
        carbohydrate: calculateAttributes('carbohydrate', meal.foods),
        protein: calculateAttributes('protein', meal.foods),
        lipid: calculateAttributes('lipid', meal.foods),
        energy: calculateAttributes('energy', meal.foods),
      };
    });
  }, [calculateAttributes, meals]);

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
  }, [calculateAttributes, dataFoods]);

  return {
    hasFoods,
    dataTable,
    dataChart,
  };
}