import { useCallback, useMemo } from 'react';

import { useFindPatientById } from '@godiet-hooks/patients';

import { useNavigate, useParams } from 'react-router-dom';

export function useAnthropometryHook() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { patient, isFetchingPatient } = useFindPatientById(id);

  const hasAnthropometry = useMemo(() => {
    // !!patient?.anthropometry, [patient]
    return false;
  }, [patient]);

  const handleNavigateToNewAnthropometry = useCallback(
    (id: string) => {
      navigate(`/${id}/antropometria/criar`);
    },
    [navigate]
  );

  return {
    patient,
    hasAnthropometry,
    isFetchingPatient,
    handleNavigateToNewAnthropometry,
  };
}
