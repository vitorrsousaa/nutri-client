import { useGetAllPatients } from '../../hooks/patients';
import { useAuth } from '../../hooks/useAuth';

export function usePatientsHook() {
  const { patients, isFetchingPatients } = useGetAllPatients();

  const { name } = useAuth();

  return {
    patients,
    isFetchingPatients,
    name,
  };
}
