import { useCallback, useMemo, useState } from 'react';

import { TAnamnesis } from '@godiet-entities/anamnesis/TAnamnesis';
import { useGetAllAnamnesis } from '@godiet-hooks/anamnesis';
import { useFindPatientById } from '@godiet-hooks/patients';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useParams } from 'react-router-dom';

export function useAnamneseHook() {
  const { id } = useParams<{ id: string }>();

  const { patient, isFetchingPatient } = useFindPatientById(id);

  const { anamnesis: anamnesisService, isFetchingAnamnesis } =
    useGetAllAnamnesis(id);

  const [modalSelecteAnamnesisIsOpen, setIsModalSelectAnamnesisIsOpen] =
    useState(false);
  const [modalShowAnamnesisIsOpen, setIsModalShownAnamnesisIsOpen] =
    useState(false);
  const [selectedAnamnesis, setSelectedAnamnesis] = useState<TAnamnesis | null>(
    null
  );

  const toggleModalSelectAnamnesis = useCallback(() => {
    setIsModalSelectAnamnesisIsOpen((prevState) => !prevState);
  }, []);

  const toggleModalShowAnamnesis = useCallback(() => {
    setIsModalShownAnamnesisIsOpen((prevState) => !prevState);
  }, []);

  const handleSelectAnamnesis = useCallback(
    (anamnesis: TAnamnesis) => {
      setSelectedAnamnesis(anamnesis);
      toggleModalShowAnamnesis();
    },
    [toggleModalShowAnamnesis]
  );

  const hasAnamnesis = useMemo(
    () => Boolean(anamnesisService.length > 0),
    [anamnesisService]
  );

  const anamnesis = useMemo(() => {
    const newAnamnesis = anamnesisService.map((anamnesis) => {
      const date = new Date(anamnesis.createdAt);

      return {
        ...anamnesis,
        createdAt: format(date, 'dd/MM/yyyy', { locale: ptBR }),
      };
    });

    return newAnamnesis;
  }, [anamnesisService]);

  return {
    patient,
    isFetchingPatient,
    isLoading: isFetchingAnamnesis || isFetchingPatient,
    modalSelecteAnamnesisIsOpen,
    hasAnamnesis,
    anamnesis,
    selectedAnamnesis,
    modalShowAnamnesisIsOpen,
    toggleModalSelectAnamnesis,
    toggleModalShowAnamnesis,
    handleSelectAnamnesis,
  };
}
