import { useCallback, useMemo, useState } from 'react';

import {
  OriginFoodEnum,
  TOriginFoodEnum,
} from '../../../../entities/food/origin/TOrigin';
import { useGetAllFoods } from '../../../../hooks/food';
import { SelectOptionsType } from '../../../../libs/ui/components/Select';

import { ModalAddFoodProps } from './ModalAddFood';

type CreateFoodSchema = {
  selectedFood: string;
  quantity: number;
};

export function useModalAddFood(props: ModalAddFoodProps) {
  const { onClose, appendFood } = props;

  const [newFood, setNewFood] = useState<CreateFoodSchema>({
    selectedFood: '',
    quantity: 0,
  });
  const [origin, setOrigin] = useState<TOriginFoodEnum>('TACO');

  const { foods, isFetchingFoods } = useGetAllFoods(origin);

  const handleAddNewFood = useCallback(() => {
    const currentFood = foods.find((food) => food.id === newFood.selectedFood);

    if (!currentFood) {
      return;
    }

    appendFood({
      name: currentFood?.name,
      quantity: newFood.quantity,
      baseUnit: currentFood?.baseUnit,
      foodId: currentFood?.id,
      origin,
      energy:
        (newFood.quantity *
          Number(
            currentFood.attributes.find((attr) => attr.name === 'energy')?.qty
          ) || 0) / currentFood.baseQty,
      protein:
        (newFood.quantity *
          Number(
            currentFood.attributes.find((attr) => attr.name === 'protein')?.qty
          ) || 0) / currentFood.baseQty,
      carbohydrate:
        (newFood.quantity *
          Number(
            currentFood.attributes.find((attr) => attr.name === 'carbohydrate')
              ?.qty
          ) || 0) / currentFood.baseQty,
      lipid:
        (newFood.quantity *
          Number(
            currentFood.attributes.find((attr) => attr.name === 'lipid')?.qty
          ) || 0) / currentFood.baseQty,
    });

    onClose();
  }, [newFood, appendFood, onClose, foods]);

  const handleChangeFieldFood = useCallback(
    <Field extends keyof CreateFoodSchema>(
      field: Field,
      newValue: CreateFoodSchema[Field]
    ) => {
      setNewFood((prevFood) => ({
        ...prevFood,

        [field]: newValue,
      }));
    },
    [setNewFood, newFood]
  );

  const handleChangeOrigin = useCallback(
    (origin: string) => {
      const parsedOrigin = OriginFoodEnum.parse(origin);
      setOrigin(parsedOrigin);
    },
    [setOrigin]
  );

  const foodOptions = useMemo<SelectOptionsType[]>(() => {
    const mappedFoods = foods.map((food) => ({
      label: food.name,
      value: food.id,
    }));
    mappedFoods.unshift({ label: 'Selecione um alimento', value: '' });

    return mappedFoods;
  }, [foods]);

  const isValid = useMemo(() => {
    return Boolean(newFood.selectedFood.length > 0);
  }, [newFood]);

  return {
    foods,
    foodOptions,
    isFetchingFoods,
    isValid,
    handleAddNewFood,
    handleChangeOrigin,
    handleChangeFieldFood,
  };
}
