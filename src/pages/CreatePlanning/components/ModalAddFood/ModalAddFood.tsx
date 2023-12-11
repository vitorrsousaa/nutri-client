import { forwardRef, useImperativeHandle } from 'react';

import {
  FieldValues,
  UseFieldArrayAppend,
  UseFieldArrayUpdate,
} from 'react-hook-form';

import Button from '../../../../libs/ui/components/Button';
import FormField from '../../../../libs/ui/components/FormField';
import Input from '../../../../libs/ui/components/Input';
import Modal from '../../../../libs/ui/components/Modal';
import Radio from '../../../../libs/ui/components/Radio';
import Select from '../../../../libs/ui/components/Select';
import { FoodDataForm } from '../FoodForm/FoodForm.hook';

import { useModalAddFood } from './ModalAddFood.hook';

export interface ModalAddFoodProps {
  isOpen: boolean;
  onClose: () => void;
  appendFood: UseFieldArrayAppend<FieldValues, `meals.${number}.foods`>;
  updateFood: UseFieldArrayUpdate<FieldValues, `meals.${number}.foods`>;
}

export interface IModalAddFoodRef {
  setFieldsValues: (food: FoodDataForm) => void;
  setIndexFood: (index: number) => void;
}

const ModalAddFood = forwardRef<IModalAddFoodRef, ModalAddFoodProps>(
  (props, ref) => {
    const { isOpen } = props;

    const {
      foodOptions,
      isFetchingFoods,
      isValid,
      selectedFood,
      dataChart,
      handleAddNewFood,
      handleChangeFieldFood,
      handleChangeOrigin,
      handleCloseModal,
      setIsEditingFood,
      setIndexFood,
    } = useModalAddFood(props);

    useImperativeHandle(
      ref,
      () => ({
        setFieldsValues: (food: FoodDataForm) => {
          handleChangeOrigin(food.origin);
          handleChangeFieldFood('selectedFood', food.foodId);
          handleChangeFieldFood('quantity', food.quantity);
          setIsEditingFood(true);
        },
        setIndexFood: (index: number) => setIndexFood(index),
      }),
      [
        handleChangeFieldFood,
        handleChangeOrigin,
        setIndexFood,
        setIsEditingFood,
      ]
    );

    return (
      <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
        <Modal.Content>
          <Modal.Header>
            Adicionando um novo alimento
            <Modal.CloseButton />
          </Modal.Header>

          <Modal.Body>
            <FormField
              name="origin"
              defaultValue={'TACO'}
              // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              //   handleChangeOrigin(e.target.value)
              // }
              isRequired
              label="Tabela de origem"
            >
              <Radio
                direction="row"
                name="origin"
                options={[
                  { label: 'TACO', value: 'TACO' },
                  // { label: 'USDA', value: 'CUSTOM' },
                ]}
              />
            </FormField>

            <FormField label="Alimento">
              <Select
                options={foodOptions}
                isLoading={isFetchingFoods}
                value={selectedFood?.foodId}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleChangeFieldFood('selectedFood', e.target.value)
                }
              />
            </FormField>

            <FormField label="Quantidade em gramas (g)">
              <Input
                type="number"
                placeholder="Quantidade do alimento"
                value={
                  selectedFood?.quantity === 0 ? '' : selectedFood?.quantity
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChangeFieldFood('quantity', Number(e.target.value))
                }
              />
            </FormField>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={handleCloseModal} variant="danger">
              Cancelar
            </Button>
            <Button onClick={handleAddNewFood} isDisabled={!isValid}>
              Adicionar
            </Button>
          </Modal.Footer>

          {dataChart && (
            // <VictoryChart
            //   animate={{
            //     duration: 500,
            //     onLoad: { duration: 200 },
            //   }}
            //   domainPadding={{ x: 0 }}
            // >
            //   <VictoryAxis />
            //   <VictoryBar
            //     barRatio={1}
            //     height={220}
            //     width={200}
            //     cornerRadius={0}
            //     style={{ data: { fill: '#399921' } }}
            //     alignment="middle"
            //     labels={({ datum }) => `${datum.y.toFixed(2)}`}
            //     data={dataChart}
            //   />
            // </VictoryChart>
            <strong>chart</strong>
          )}
        </Modal.Content>
      </Modal.Root>
    );
  }
);

ModalAddFood.displayName = 'ModalAddFood';

export default ModalAddFood;
