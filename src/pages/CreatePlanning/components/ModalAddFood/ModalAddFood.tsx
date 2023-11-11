import { FieldValues, UseFieldArrayAppend } from 'react-hook-form';

import Button from '../../../../libs/ui/components/Button';
import FormField from '../../../../libs/ui/components/FormField';
import Input from '../../../../libs/ui/components/Input';
import Modal from '../../../../libs/ui/components/Modal';
import Radio from '../../../../libs/ui/components/Radio';
import Select from '../../../../libs/ui/components/Select';

import { useModalAddFood } from './ModalAddFood.hook';

export interface ModalAddFoodProps {
  isOpen: boolean;
  onClose: () => void;
  appendFood: UseFieldArrayAppend<FieldValues, `meals.${number}.food`>;
}

export function ModalAddFood(props: ModalAddFoodProps) {
  const { isOpen, onClose } = props;

  const {
    foods,
    foodOptions,
    isFetchingFoods,
    handleAddNewFood,
    handleChangeFieldFood,
    handleChangeOrigin,
  } = useModalAddFood(props);

  console.log(foods);

  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <Modal.Header>
          Adicionando um novo alimento
          <Modal.CloseButton />
        </Modal.Header>

        <FormField
          name="origin"
          defaultValue={'DATABASE'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeOrigin(e.target.value)
          }
          isRequired
          label="Tabela de origem"
        >
          <Radio
            direction="row"
            name="origin"
            options={[
              { label: 'Tabela própria', value: 'DATABASE' },
              { label: 'USDA', value: 'CUSTOM' },
            ]}
          />
        </FormField>

        <FormField
          label="Alimento"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeFieldFood('name', e.target.value)
          }
        >
          <Select options={foodOptions} isLoading={isFetchingFoods} />
        </FormField>

        <FormField
          label="Quantidade em gramas (g)"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeFieldFood('quantity', Number(e.target.value))
          }
        >
          <Input type="number" placeholder="Quantidade do alimento" />
        </FormField>

        <Modal.Footer>
          <Button onClick={onClose} colorScheme="red">
            Cancelar
          </Button>
          <Button onClick={handleAddNewFood} colorScheme="green">
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}
