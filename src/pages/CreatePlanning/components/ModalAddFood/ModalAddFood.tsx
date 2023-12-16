import { forwardRef, useImperativeHandle } from 'react';

import Button from '@godiet-ui/Button';
import FormField from '@godiet-ui/FormField';
import Input from '@godiet-ui/Input';
import Modal from '@godiet-ui/Modal';
import Radio from '@godiet-ui/Radio';
import Select from '@godiet-ui/Select';
import Text from '@godiet-ui/Text';

import {
  FieldValues,
  UseFieldArrayAppend,
  UseFieldArrayUpdate,
} from 'react-hook-form';

import ChartSummaryFoods from '../ChartSummaryFoods';
import { FoodDataForm } from '../FoodForm/FoodForm.hook';

import { useModalAddFood } from './ModalAddFood.hook';
import * as styled from './ModalAddFood.styles';

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

          {dataChart.length > 0 && (
            <styled.ModalAddFoodContainerChart>
              <ChartSummaryFoods
                dataChart={dataChart.filter(
                  (chartType) => chartType.name !== 'Calorias'
                )}
              />
              <div className="container-extra-legend">
                <div className="extra-legend" />
                <Text as={'small'} marginRight={'8px'} className="legend">
                  Calorias:
                </Text>
                <Text as={'small'} className="legend">
                  {
                    dataChart.filter(
                      (chartType) => chartType.name === 'Calorias'
                    )[0].value
                  }{' '}
                  (kcal)
                </Text>
              </div>
            </styled.ModalAddFoodContainerChart>
          )}

          <Modal.Footer>
            <Button onClick={handleCloseModal} variant="danger">
              Cancelar
            </Button>
            <Button onClick={handleAddNewFood} isDisabled={!isValid}>
              Adicionar
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal.Root>
    );
  }
);

ModalAddFood.displayName = 'ModalAddFood';

export default ModalAddFood;
