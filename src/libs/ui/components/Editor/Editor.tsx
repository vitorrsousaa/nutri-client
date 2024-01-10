import Button from '@godiet-ui/Button';

import { EditorContent } from '@tiptap/react';

import BubbleMenu from './components/BubbleMenu';
import FloatingMenu from './components/FloatingMenu';
import { withEditorContext } from './Editor.hoc.tsx';
import { useEditorHook } from './Editor.hook';
import * as styled from './Editor.styles.ts';

export interface EditorProps {
  initialContent?: string;
}

function Editor() {
  const { editor } = useEditorHook();

  return (
    <styled.EditorWrapper>
      <EditorContent editor={editor} />

      {editor && (
        <>
          <FloatingMenu />
          <BubbleMenu />
        </>
      )}
      <styled.EditorFooter>
        <Button variant="ghost">Cancelar</Button>
        <Button
          onClick={() => {
            const test = editor?.getHTML();

            console.log(test);
          }}
        >
          Salvar
        </Button>
      </styled.EditorFooter>
    </styled.EditorWrapper>
  );
}

export default withEditorContext(Editor);
