import Button from '@godiet-ui/Button';
import Text from '@godiet-ui/Text';

import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import ModalAddFood from '../ModalAddFood';

import { useFoodFormHook } from './FoodForm.hook';
import * as styled from './FoodForm.styles';

export interface FoodFormProps {
  mealIndex: number;
}

export function FoodForm(props: FoodFormProps) {
  const {
    foods,
    modalAddFoodIsOpen,
    modalFormRef,
    toggleModalAddNewFood,
    removeFood,
    appendFood,
    updateFood,
  } = useFoodFormHook(props);

  return (
    <>
      {foods.map((food, foodIndex) => {
        return (
          <styled.FoodFormContainerFood key={food.id}>
            <div className="container-name-food">
              <Text as="small" fontSize={'16px'}>
                {food.name}
              </Text>
              <Text as="small" fontSize={'14px'}>
                {food.quantity} (g)
              </Text>
            </div>
            <div className="container-edit-actions">
              <Button
                onClick={() => {
                  toggleModalAddNewFood();
                  modalFormRef.current?.setFieldsValues(food);
                  modalFormRef.current?.setIndexFood(foodIndex);
                }}
                variant="ghost"
              >
                <EditIcon />
              </Button>

              <Button onClick={() => removeFood(foodIndex)} variant="ghost">
                <DeleteIcon />
              </Button>
            </div>
          </styled.FoodFormContainerFood>
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
