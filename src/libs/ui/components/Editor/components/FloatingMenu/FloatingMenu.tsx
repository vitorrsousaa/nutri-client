import Text from '@godiet-ui/Text';

import { useFloatingMenuHook } from './FloatingMenu.hook';
import * as styled from './FloatingMenu.styles';

export function FloatingMenu() {
  const {
    editor,
    shouldShowFloatingMenu,
    cutLastCharacter,
    handleToggleTextToHeading,
  } = useFloatingMenuHook();

  return (
    <styled.FloatingMenuWrapper
      editor={editor}
      shouldShow={({ state }) => shouldShowFloatingMenu(state)}
    >
      <styled.FloatingMenuButton onClick={cutLastCharacter}>
        <img
          src="https://www.notion.so/images/blocks/text/en-US.png"
          alt="text"
        />

        <div>
          <Text as="span">Texto</Text>

          <Text as="span">Comece a escrever com texto sem formatação</Text>
        </div>
      </styled.FloatingMenuButton>

      <styled.FloatingMenuButton onClick={() => handleToggleTextToHeading(1)}>
        <img
          src="https://www.notion.so/images/blocks/header.57a7576a.png"
          alt="heading-1"
        />

        <div>
          <Text as="span">Título 1</Text>

          <Text as="span">Título de seção grande</Text>
        </div>
      </styled.FloatingMenuButton>

      <styled.FloatingMenuButton onClick={() => handleToggleTextToHeading(2)}>
        <img
          src="https://www.notion.so/images/blocks/subheader.9aab4769.png"
          alt="heading-2"
        />

        <div>
          <Text as="span">Título 2</Text>

          <Text as="span">Título de seção médio</Text>
        </div>
      </styled.FloatingMenuButton>
    </styled.FloatingMenuWrapper>
  );
}
