import { useCallback, useMemo, useState } from 'react';

import {
  OriginFoodEnum,
  TOriginFoodEnum,
} from '../../../../entities/food/origin/TOrigin';
import { useGetAllFoods } from '../../../../hooks/food';
import { SelectOptionsType } from '../../../../libs/ui/components/Select';

import { getCalculateAttributes } from './funcs/calculateAttributes';
import { ModalAddFoodProps } from './ModalAddFood';

type CreateFoodSchema = {
  selectedFood: string;
  quantity: number;
};

export function useModalAddFood(props: ModalAddFoodProps) {
  const { onClose, appendFood } = props;

  const [newFood, setNewFood] = useState<CreateFoodSchema | null>(null);
  const [origin, setOrigin] = useState<TOriginFoodEnum>('TACO');

  const { foods, isFetchingFoods } = useGetAllFoods(origin);

  const handleCloseModal = useCallback(() => {
    onClose();
    setNewFood(null);
  }, [onClose, setNewFood]);

  const handleAddNewFood = useCallback(() => {
    const currentFood = foods.find((food) => food.id === newFood?.selectedFood);

    if (!currentFood) {
      return;
    }

    if (!newFood) {
      return;
    }

    appendFood({
      name: currentFood?.name,
      quantity: newFood.quantity,
      baseUnit: currentFood?.baseUnit,
      foodId: currentFood?.id,
      origin,
      energy: getCalculateAttributes(newFood.quantity, currentFood, 'energy'),
      protein: getCalculateAttributes(newFood.quantity, currentFood, 'protein'),
      carbohydrate: getCalculateAttributes(
        newFood.quantity,
        currentFood,
        'carbohydrate'
      ),
      lipid: getCalculateAttributes(newFood.quantity, currentFood, 'lipid'),
    });

    handleCloseModal();
  }, [newFood, appendFood, onClose, foods]);

  const handleChangeFieldFood = useCallback(
    <Field extends keyof CreateFoodSchema>(
      field: Field,
      newValue: CreateFoodSchema[Field]
    ) => {
      setNewFood((prevFood) => {
        if (prevFood === null) {
          const createObject: CreateFoodSchema = {
            selectedFood: '',
            quantity: 0,
          };
          return { ...createObject, [field]: newValue };
        }

        return {
          ...prevFood,

          [field]: newValue,
        };
      });
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
    return Boolean(
      newFood && newFood.quantity > 0 && newFood.selectedFood.length > 0
    );
  }, [newFood]);

  return {
    foods,
    foodOptions,
    isFetchingFoods,
    isValid,
    handleAddNewFood,
    handleChangeOrigin,
    handleChangeFieldFood,
    handleCloseModal,
  };
}
