import Button from '@godiet-ui/Button';

import BubbleMenu from './components/BubbleMenu';
import EditorContent from './components/EditorContent';
import FloatingMenu from './components/FloatingMenu';
import { withEditorContext } from './Editor.hoc.tsx';
import { useEditorHook } from './Editor.hook';
import * as styled from './Editor.styles.ts';

export interface EditorProps {
  initialContent?: string;
  isValid?: boolean;
  isLoading?: boolean;
  onBackButton?: () => void;
  onSave?: (text: string) => void;
}

function Editor(props: EditorProps) {
  const { isValid, isLoading, onBackButton, onSave } = props;

  const { editor } = useEditorHook();

  return (
    <styled.EditorWrapper>
      {editor && (
        <>
          <EditorContent />
          <FloatingMenu />
          <BubbleMenu />
        </>
      )}
      <styled.EditorFooter>
        <Button variant="ghost" onClick={onBackButton} isDisabled={isLoading}>
          Cancelar
        </Button>
        <Button
          isDisabled={!isValid}
          isLoading={isLoading}
          onClick={() => {
            const text = editor?.getHTML();

            onSave?.(text);
          }}
        >
          Salvar
        </Button>
      </styled.EditorFooter>
    </styled.EditorWrapper>
  );
}

export default withEditorContext(Editor);
