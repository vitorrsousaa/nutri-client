import { FieldValues, UseFieldArrayAppend } from 'react-hook-form';

import Button from '../../../../libs/ui/components/Button';
import FormField from '../../../../libs/ui/components/FormField';
import Input from '../../../../libs/ui/components/Input';
import Modal from '../../../../libs/ui/components/Modal';
import Radio from '../../../../libs/ui/components/Radio';

import { useModalAddFood } from './ModalAddFood.hook';

export interface ModalAddFoodProps {
  isOpen: boolean;
  onClose: () => void;
  appendFood: UseFieldArrayAppend<FieldValues, `meals.${number}.food`>;
}

export function ModalAddFood(props: ModalAddFoodProps) {
  const { isOpen, onClose } = props;

  const { foods, handleAddNewFood, handleChangeFieldFood, handleChangeOrigin } =
    useModalAddFood(props);

  console.log(foods);

  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <Modal.Header>
          Adicionando um novo alimento
          <Modal.CloseButton />
        </Modal.Header>
        <small>
          Qual referência você deseja utilizar para o planejamento alimentar?
        </small>

        <FormField
          name="reference"
          defaultValue={'DATABASE'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChangeOrigin(e.target.value);
          }}
        >
          <Radio
            direction="row"
            name="reference"
            options={[
              { label: 'Tabela própria', value: 'DATABASE' },
              { label: 'USDA', value: 'CUSTOM' },
            ]}
          />
        </FormField>
        <FormField
          label="Nome do alimento"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeFieldFood('name', e.target.value)
          }
        >
          <Input type="text" placeholder="Nome do alimento" />
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
