import { EditorProps } from './Editor';
import { EditorContextProvider } from './Editor.context';

export function withEditorContext(Component: React.ComponentType<EditorProps>) {
  Component.displayName = 'withEditorContext';

  return function WithEditorContext(props: EditorProps) {
    return (
      <EditorContextProvider initialContent={props.initialContent}>
        <Component {...props} />
      </EditorContextProvider>
    );
  };
}
