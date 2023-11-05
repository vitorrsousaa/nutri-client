import { useCallback, useMemo, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { FoodFormProps } from './FoodForm';

interface FoodDataForm {
  name: string;
  quantity: number;
  id: string;
}

export function useFoodFormHook(props: FoodFormProps) {
  const { mealIndex } = props;

  const [modalAddFoodIsOpen, setModalAddFoodIsOpen] = useState(false);

  const { control } = useFormContext();

  const toggleModalAddNewFood = useCallback(() => {
    setModalAddFoodIsOpen((prev) => !prev);
  }, [modalAddFoodIsOpen]);

  const {
    fields,
    remove: removeFood,
    append: appendFood,
  } = useFieldArray({
    control,
    name: `meals.${mealIndex}.food`,
  });

  const foods = useMemo(() => {
    return fields;
  }, [fields]) as unknown as FoodDataForm[];

  return {
    foods,
    modalAddFoodIsOpen,
    toggleModalAddNewFood,
    removeFood,
    appendFood,
  };
}
