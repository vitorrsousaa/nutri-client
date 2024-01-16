import { useCallback, useMemo, useState } from 'react';

import { useFindPatientById } from '@godiet-hooks/patients';

import { useParams } from 'react-router-dom';

export function useAnthropometryHook() {
  const { id } = useParams<{ id: string }>();

  const { patient, isFetchingPatient } = useFindPatientById(id);

  const [modalSelectTypeIsOpen, setModalSelectTypeIsOpen] = useState(false);

  const hasAnthropometry = useMemo(() => {
    // !!patient?.anthropometry, [patient]
    return false;
  }, [patient]);

  const toggleModalSelectType = useCallback(
    () => setModalSelectTypeIsOpen((prev) => !prev),
    []
  );

  return {
    patient,
    hasAnthropometry,
    isFetchingPatient,
    modalSelectTypeIsOpen,
    toggleModalSelectType,
  };
}
