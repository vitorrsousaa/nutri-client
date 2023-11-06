import Button from '../../../../libs/ui/components/Button';
import ModalAddFood from '../ModalAddFood';

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
  } = useFoodFormHook(props);

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
            <Button onClick={() => removeFood(foodIndex)}>
              Remover alimento
            </Button>
          </div>
        );
      })}

      <ModalAddFood
        isOpen={modalAddFoodIsOpen}
        onClose={toggleModalAddNewFood}
        appendFood={appendFood}
      />

      <Button onClick={toggleModalAddNewFood}>Adicionar alimento</Button>
    </>
  );
}
