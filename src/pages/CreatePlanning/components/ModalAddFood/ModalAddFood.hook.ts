import { useCallback, useState } from 'react';

import {
  OriginFoodEnum,
  TOriginFoodEnum,
} from '../../../../entities/food/origin/TOrigin';
import { useGetAllFoods } from '../../../../hooks/food';

import { ModalAddFoodProps } from './ModalAddFood';

type CreateFoodSchema = {
  name: string;
  quantity: number;
};

export function useModalAddFood(props: ModalAddFoodProps) {
  const { onClose, appendFood } = props;

  const [newFood, setNewFood] = useState<CreateFoodSchema>({
    name: '',
    quantity: 0,
  });
  const [origin, setOrigin] = useState<TOriginFoodEnum>('DATABASE');

  const { foods } = useGetAllFoods(origin);

  const handleAddNewFood = useCallback(() => {
    appendFood(newFood);

    onClose();
  }, [newFood, appendFood, onClose]);

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

  return {
    foods,
    handleAddNewFood,
    handleChangeOrigin,
    handleChangeFieldFood,
  };
}
