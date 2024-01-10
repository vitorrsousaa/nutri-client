import { ChangeEvent, useCallback, useMemo, useState } from 'react';

import { TAnamnesisCreateDTO } from '@godiet-entities/anamnesis/TAnamnesisCreateDTO';
import { TAnamnesisTemplate } from '@godiet-entities/anamnesisTemplate/TAnamnesisTemplate';
import { useCreateAnamnesis } from '@godiet-hooks/anamnesis';

import { useLocation, useParams } from 'react-router-dom';

export function useCreateAnamnesisHook() {
  const location = useLocation();
  const params = useParams<{ id: string }>();

  const { createAnamnesis, isCreatingAnamnesis } = useCreateAnamnesis();

  const [title, setTitle] = useState('');

  const handleChangeTitle = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);
    },
    []
  );

  const handleCreateAnamnesis = useCallback(
    async (text: string) => {
      const newAnamnesis: TAnamnesisCreateDTO = {
        text,
        title,
      };

      await createAnamnesis({
        anamnesis: newAnamnesis,
        patientId: params?.id || location.state?.patientId,
      });
    },
    [createAnamnesis, location.state?.patientId, params?.id, title]
  );

  const anamnesisTemplate = useMemo<TAnamnesisTemplate | null>(() => {
    if (location.state?.template) {
      return location.state.template;
    }

    return null;
  }, [location.state?.template]);

  const formIsValid = useMemo(() => Boolean(title.length > 0), [title]);

  return {
    anamnesisTemplate,
    title,
    formIsValid,
    isLoading: isCreatingAnamnesis,
    handleChangeTitle,
    handleCreateAnamnesis,
  };
}
