import { useCallback, useMemo, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

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
  }, [modalAddFoodIsOpen]);

  const foods = useMemo(() => {
    return fields;
  }, [fields]) as unknown as FoodDataForm[];

  return {
    foods,
    modalAddFoodIsOpen,
    toggleModalAddNewFood,
    removeFood,
    appendFood,
    updateFood,
  };
}
