import { useCallback, useMemo, useState } from 'react';

import { TAnamnesisTemplate } from '@godiet-entities/anamnesisTemplate/TAnamnesisTemplate';
import { useGetAllAnamneseTemplate } from '@godiet-hooks/anamnesisTemplate';
import { useAuth } from '@godiet-hooks/useAuth';

export function useModalCreateAnamnesisHook() {
  const { userId } = useAuth();

  const { anamnesisTemplate, isFetchingAnamnesisTemplate } =
    useGetAllAnamneseTemplate(userId);

  const [selectedAnamneseTemplate, setSelectedAnamneseTemplate] =
    useState<TAnamnesisTemplate | null>(null);

  const handleChangeAnamnesis = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (event.target.value === '') {
        setSelectedAnamneseTemplate(null);
        return;
      }

      if (event.target.value === 'empty') {
        setSelectedAnamneseTemplate({
          id: '',
          title: '',
          text: '',
          userId: userId || '',
          createdAt: new Date(),
        });
        return;
      }

      const selected = anamnesisTemplate.find(
        (anamnese) => anamnese.id === event.target.value
      );
      if (selected) {
        setSelectedAnamneseTemplate(selected);
      }
    },
    [anamnesisTemplate, userId]
  );

  const anamnesisOptions = useMemo(() => {
    const emptyOption = [
      { value: '', label: 'Selecione um modelo de anamnese' },
      { value: 'empty', label: 'Nova anamnese em branco (goDiet)' },
    ];

    return [
      ...emptyOption,
      ...anamnesisTemplate.map((anamnese) => ({
        label: anamnese.title,
        value: anamnese.id,
      })),
    ];
  }, [anamnesisTemplate]);

  const formIsValid = useMemo(
    () => Boolean(selectedAnamneseTemplate && userId),
    [selectedAnamneseTemplate, userId]
  );

  return {
    isFetchingAnamnesisTemplate,
    anamnesisOptions,
    formIsValid,
    handleChangeAnamnesis,
  };
}
