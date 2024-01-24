import { useCallback, useMemo } from 'react';

import {
  useDeleteAntropometry,
  useGetAllAntropometry,
} from '@godiet-hooks/anthropometry';
import { useFindPatientById } from '@godiet-hooks/patients';

import { useNavigate, useParams } from 'react-router-dom';

export function useAnthropometryHook() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { patient, isFetchingPatient } = useFindPatientById(id);

  const { anthropometry, isFetchingAnthropometry } = useGetAllAntropometry(
    patient?.id as string
  );

  const { deleteAnthropometry, isDeletingAnthropometry } =
    useDeleteAntropometry(patient?.id as string);

  const hasAnthropometry = useMemo(() => {
    return anthropometry.length > 0;
  }, [anthropometry.length]);

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
    deleteAnthropometry,
    anthropometry,
    isFetchingAnthropometry,
    isDeletingAnthropometry,
  };
}
