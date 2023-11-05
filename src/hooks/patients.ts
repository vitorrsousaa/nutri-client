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

export function useFindByIdPatient(id: string | undefined) {
  const {
    data: patient,
    isFetching: isFetchingPatient,
    remove: removePatient,
  } = useQuery({
    queryKey: ['@patients', id],
    queryFn: () => PatientService.findById(id),
  });

  return {
    patient,
    isFetchingPatient,
    removePatient,
  };
}

export function useDeletePatient() {
  const queryClient = useQueryClient();

  const { isLoading: isDeletingPatient, mutateAsync: deletePatient } =
    useMutation({
      mutationFn: PatientService.delete,
      onSuccess: () => {
        queryClient.invalidateQueries(['@patients']);
      },
    });

  return {
    isDeletingPatient,
    deletePatient,
  };
}
