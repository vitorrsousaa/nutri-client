import styled from 'styled-components';

export const EditorWrapper = styled.div`
  .outlined-none {
    outline: none;
  }

  .tiptap p.is-empty::before,
  h1.is-empty::before {
    color: #adb5bd;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }
`;

export const EditorFooter = styled.footer`
  width: 100%;
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  margin-top: 24px;
`;
