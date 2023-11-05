import { useCallback, useState } from 'react';

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

  return {
    handleAddNewFood,

    handleChangeFieldFood,
  };
}
