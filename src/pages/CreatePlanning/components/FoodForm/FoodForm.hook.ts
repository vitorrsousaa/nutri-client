/* eslint-disable indent */
import { useCallback, useMemo, useRef, useState } from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';

import { DataChartType } from '../../types/dataChartType';
import { IModalAddFoodRef } from '../ModalAddFood';

import { FoodFormProps } from './FoodForm';

export interface FoodDataForm {
  name: string;
  quantity: number;
  id: string;
  protein: number;
  baseUnit: string;
  energy: number;
  carbohydrate: number;
  lipid: number;
  foodId: string;
  origin: string;
}

export function useFoodFormHook(props: FoodFormProps) {
  const { mealIndex } = props;

  const [modalAddFoodIsOpen, setModalAddFoodIsOpen] = useState(false);

  const modalFormRef = useRef<IModalAddFoodRef>(null);

  const { control } = useFormContext();

  const {
    fields,
    remove: removeFood,
    append: appendFood,
    update: updateFood,
  } = useFieldArray({
    control,
    name: `meals.${mealIndex}.foods`,
  });

  const toggleModalAddNewFood = useCallback(() => {
    setModalAddFoodIsOpen((prev) => !prev);
  }, []);

  const foods = useMemo(() => {
    return fields;
  }, [fields]) as unknown as FoodDataForm[];

  const getFoodChart = useCallback<(food: FoodDataForm) => DataChartType[]>(
    (food: FoodDataForm) =>
      [
        {
          name: 'Carboidratos',
          value: Math.round(food.carbohydrate),
          unit: 'g',
        },
        {
          name: 'Proteínas',
          value: Math.round(food.protein),
          unit: 'g',
        },
        {
          name: 'Lipídios',
          value: Math.round(food.lipid),
          unit: 'g',
        },
      ] as DataChartType[],
    []
  );

  return {
    foods,
    modalAddFoodIsOpen,
    modalFormRef,
    toggleModalAddNewFood,
    removeFood,
    appendFood,
    updateFood,
    getFoodChart,
  };
}
