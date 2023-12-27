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

export function useFindPatientById(id: string | undefined) {
  const {
    data: patientRequested,
    isFetching: isFetchingPatient,
    remove: removePatient,
  } = useQuery({
    queryKey: [`@patients-${id && id}`, id],
    queryFn: () => PatientService.findById(id),
  });

  return {
    patient: patientRequested,
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

export function useUpdatePatient(id: string) {
  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: PatientService.update,
    onSuccess: () => {
      queryClient.invalidateQueries([`@patients-${id}`, id]);
    },
  });

  return {
    isUpdatingPatient: isLoading,
    updatePatient: mutateAsync,
  };
}
