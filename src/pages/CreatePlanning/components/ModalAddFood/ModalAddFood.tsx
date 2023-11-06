import { FieldValues, UseFieldArrayAppend } from 'react-hook-form';

import Button from '../../../../libs/ui/components/Button';
import FormField from '../../../../libs/ui/components/FormField';
import Input from '../../../../libs/ui/components/Input';
import Modal from '../../../../libs/ui/components/Modal';

import { useModalAddFood } from './ModalAddFood.hook';

export interface ModalAddFoodProps {
  isOpen: boolean;
  onClose: () => void;
  appendFood: UseFieldArrayAppend<FieldValues, `meals.${number}.food`>;
}

export function ModalAddFood(props: ModalAddFoodProps) {
  const { isOpen, onClose } = props;

  const { handleAddNewFood, handleChangeFieldFood } = useModalAddFood(props);

  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <Modal.Header>
          Adicionando um novo alimento
          <Modal.CloseButton />
        </Modal.Header>
        <FormField label="Nome do alimento">
          <Input
            type="text"
            placeholder="Nome do alimento"
            onChange={(e) => handleChangeFieldFood('name', e.target.value)}
          />
        </FormField>

        <FormField label="Quantidade em gramas (g)">
          <Input
            type="number"
            placeholder="Quantidade do alimento"
            onChange={(e) =>
              handleChangeFieldFood('quantity', Number(e.target.value))
            }
          />
        </FormField>

        <Modal.Footer>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={handleAddNewFood}>Adicionar</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}
