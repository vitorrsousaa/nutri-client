import AppProvider from '@godiet-components/AppProvider';
import Editor from '@godiet-ui/Editor';
import Input from '@godiet-ui/Input';
import Text from '@godiet-ui/Text';

import { useNavigate } from 'react-router-dom';

import { useCreateAnamnesisHook } from './CreateAnamnesis.hook';

export function CreateAnamnesis() {
  const {
    anamnesisTemplate,
    title,
    formIsValid,
    isLoading,
    handleChangeTitle,
    handleCreateAnamnesis,
  } = useCreateAnamnesisHook();

  const navigate = useNavigate();

  return (
    <AppProvider
      title="Criar anamnese"
      hasBackButton
      hasError={!anamnesisTemplate}
      errorMessage={
        <>
          <Text align={'center'}>
            Não foi possível encontrar esse paciente no nosso banco de dados1
          </Text>
        </>
      }
    >
      {anamnesisTemplate && (
        <>
          <Input
            placeholder="Título de anamnese"
            onChange={handleChangeTitle}
            value={title}
          />

          <Editor
            initialContent={anamnesisTemplate?.text}
            isValid={formIsValid}
            isLoading={isLoading}
            onBackButton={() => {
              navigate(-1);
            }}
            onSave={handleCreateAnamnesis}
          />
        </>
      )}
    </AppProvider>
  );
}
