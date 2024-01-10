import { useEditor } from '@godiet-ui/Editor/hooks/useEditor';

import { RxFontBold, RxFontItalic, RxStrikethrough } from 'react-icons/rx';

import * as styled from './BubbleMenu.styles';

export function BubbleMenu() {
  const { editor } = useEditor();

  return (
    <styled.BubbleMenuWrapper editor={editor}>
      <styled.BubbleMenuButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'isActive' : ''}
      >
        <RxFontBold />
      </styled.BubbleMenuButton>

      <styled.BubbleMenuButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'isActive' : ''}
      >
        <RxFontItalic />
      </styled.BubbleMenuButton>

      <styled.BubbleMenuButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'isActive' : ''}
      >
        <RxStrikethrough />
      </styled.BubbleMenuButton>
    </styled.BubbleMenuWrapper>
  );
}
