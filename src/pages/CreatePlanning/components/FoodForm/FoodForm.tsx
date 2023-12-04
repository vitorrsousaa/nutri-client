import { useRef } from 'react';

import Button from '../../../../libs/ui/components/Button';
import ModalAddFood, { IModalAddFoodRef } from '../ModalAddFood';

import { useFoodFormHook } from './FoodForm.hook';

export interface FoodFormProps {
  mealIndex: number;
}

export function FoodForm(props: FoodFormProps) {
  const {
    foods,
    modalAddFoodIsOpen,
    toggleModalAddNewFood,
    removeFood,
    appendFood,
    updateFood,
  } = useFoodFormHook(props);

  const modalFormRef = useRef<IModalAddFoodRef>(null);

  return (
    <>
      {foods.map((food, foodIndex) => {
        return (
          <div
            key={food.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: 8,
              border: 'solid 1px blue',
            }}
          >
            <div>
              <h2>{food.name}</h2>
              <h3>{food.quantity}</h3>
            </div>
            <div>
              <Button
                onClick={() => {
                  toggleModalAddNewFood();
                  modalFormRef.current?.setFieldsValues(food);
                  modalFormRef.current?.setIndexFood(foodIndex);
                }}
              >
                Editar
              </Button>
              <Button onClick={() => removeFood(foodIndex)}>
                Remover alimento
              </Button>
            </div>
          </div>
        );
      })}

      <ModalAddFood
        isOpen={modalAddFoodIsOpen}
        onClose={toggleModalAddNewFood}
        appendFood={appendFood}
        updateFood={updateFood}
        ref={modalFormRef}
      />

      <Button onClick={toggleModalAddNewFood}>Adicionar alimento</Button>
    </>
  );
}
