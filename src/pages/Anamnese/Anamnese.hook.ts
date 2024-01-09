import { useParams } from 'react-router-dom';

import { useFindPatientById } from '../../hooks/patients';

export function useAnamneseHook() {
  const { id } = useParams<{ id: string }>();

  const { patient, isFetchingPatient } = useFindPatientById(id);

  return {
    patient,
    isFetchingPatient,
  };
}
