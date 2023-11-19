import { useGetAllPatients } from '../../hooks/patients';

export function usePatientsHook() {
  const { patients, isFetchingPatients } = useGetAllPatients();

  return {
    patients,
    isFetchingPatients,
  };
}
