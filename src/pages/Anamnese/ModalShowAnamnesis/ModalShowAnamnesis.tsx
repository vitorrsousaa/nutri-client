import { TAnamnesis } from '@godiet-entities/anamnesis/TAnamnesis';
import Editor from '@godiet-ui/Editor';
import Modal from '@godiet-ui/Modal';

interface ModalShowAnamnesisProps {
  isOpen: boolean;
  onClose: () => void;
  anamnesis: TAnamnesis | null;
}

export function ModalShowAnamnesis(props: ModalShowAnamnesisProps) {
  const { anamnesis, isOpen, onClose } = props;

  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxW={'700px'}>
        <Modal.Header marginBottom={'16px'}>
          {anamnesis
            ? anamnesis.title
            : 'Não foi possível encontrar essa anamnese'}
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          {anamnesis && (
            <Editor initialContent={anamnesis.text} isEditable={false} />
          )}
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
