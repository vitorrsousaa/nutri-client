import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import PatientService from '../service/Patient';

export function useGetAllPatients() {
  const {
    data: patients,
    isFetching: isFetchingPatients,
    refetch: refetchPatients,
  } = useQuery({
    queryKey: ['@patients'],
    queryFn: PatientService.getAll,
  });

  return {
    patients: patients ?? [],
    isFetchingPatients,
    refetchPatients,
  };
}

export function useCreatePatients() {
  const queryClient = useQueryClient();

  const { isLoading: isCreatingPatient, mutateAsync: createPatient } =
    useMutation({
      mutationFn: PatientService.create,
      onSuccess: () => {
        queryClient.invalidateQueries(['@patients']);
      },
    });

  return {
    isCreatingPatient,
    createPatient,
  };
}
