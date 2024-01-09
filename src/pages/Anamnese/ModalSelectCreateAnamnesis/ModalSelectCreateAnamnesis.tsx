import Button from '@godiet-ui/Button';
import Modal from '@godiet-ui/Modal';
import Select from '@godiet-ui/Select';
import Text from '@godiet-ui/Text';

import { useModalCreateAnamnesisHook } from './ModalSelectCreateAnamnesis.hook';

export interface ModalSelecteCreateAnamnesisProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: string;
}

export function ModalSelecteCreateAnamnesis(
  props: ModalSelecteCreateAnamnesisProps
) {
  const { isOpen, onClose } = props;

  const {
    isFetchingAnamnesisTemplate,
    anamnesisOptions,
    formIsValid,
    handleChangeAnamnesis,
  } = useModalCreateAnamnesisHook();

  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <Modal.Header>
          Criar nova anamnese
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Text color={'#666'} fontSize={'14px'}>
            Você pode selecionar um template criado anteriormente ou iniciar uma
            nova em branco. Saiba mais acessando Configurações {'->'} Anamnese
          </Text>
          <Select
            isLoading={isFetchingAnamnesisTemplate}
            options={anamnesisOptions}
            onChange={handleChangeAnamnesis}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button isDisabled={!formIsValid}>Confirmar</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}
