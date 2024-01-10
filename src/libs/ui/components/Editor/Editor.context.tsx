import { createContext } from 'react';

import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';
import { Editor, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

type EditorContextValue = {
  editor: Editor;
};

export const EditorContext = createContext<EditorContextValue | null>(null);

interface EditorContextProviderProps {
  children: React.ReactNode;
  initialContent?: string;
}

export function EditorContextProvider(props: EditorContextProviderProps) {
  const { initialContent } = props;

  const PlaceholderExtension = Placeholder.configure({
    placeholder: (props) => {
      const { node } = props;
      if (node.type.name === 'heading') {
        return 'Título 1';
      }
      return 'Digite aqui ou "/" para comandos';
    },
  });

  const extensions = [StarterKit, Highlight, Typography, PlaceholderExtension];

  const editor = useEditor({
    extensions,
    content: initialContent,
    editorProps: {
      attributes: {
        class: 'outlined-none',
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <EditorContext.Provider value={{ editor }}>
      {props.children}
    </EditorContext.Provider>
  );
}
