import { useCallback, useState } from 'react';

import { useParams } from 'react-router-dom';

import { useFindPatientById } from '../../hooks/patients';

export function useAnamneseHook() {
  const { id } = useParams<{ id: string }>();

  const { patient, isFetchingPatient } = useFindPatientById(id);

  const [modalSelecteAnamnesisIsOpen, setIsModalSelectAnamnesisIsOpen] =
    useState(false);

  const toggleModalSelectAnamnesis = useCallback(() => {
    setIsModalSelectAnamnesisIsOpen((prevState) => !prevState);
  }, []);

  return {
    patient,
    isFetchingPatient,
    modalSelecteAnamnesisIsOpen,
    toggleModalSelectAnamnesis,
  };
}
