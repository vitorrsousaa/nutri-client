import { useEditor } from '@godiet-ui/Editor/hooks/useEditor';

import * as styled from './EditorContent.styles';

export function EditorContent() {
  const { editor } = useEditor();

  return <styled.EditorContentWrapper editor={editor} />;
}
