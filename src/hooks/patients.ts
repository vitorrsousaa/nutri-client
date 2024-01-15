import { useMutation, useQuery, useQueryClient } from '@godiet-query';
import PatientService from '@godiet-services/Patient';

export function useGetAllPatients() {
  const {
    data: patients,
    isFetching,
    isPending,
    refetch: refetchPatients,
  } = useQuery({
    queryKey: ['@patients'],
    queryFn: PatientService.getAll,
  });

  return {
    patients: patients ?? [],
    isFetchingPatients: isFetching || isPending,
    refetchPatients,
  };
}

export function useCreatePatients() {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync: createPatient } = useMutation({
    mutationFn: PatientService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['@patients'],
      });
    },
  });

  return {
    isCreatingPatient: isPending,
    createPatient,
  };
}

export function useFindPatientById(patientId: string | undefined) {
  const queryClient = useQueryClient();

  const {
    data: patientRequested,
    isFetching,
    isPending,
  } = useQuery({
    queryKey: [`@patients-${patientId && patientId}`, patientId],
    queryFn: () => PatientService.findById(patientId),
  });

  function removePatient() {
    queryClient.invalidateQueries({
      queryKey: [`@patients-${patientId && patientId}`, patientId],
    });
  }

  return {
    patient: patientRequested,
    isFetchingPatient: isFetching || isPending,
    removePatient,
  };
}

export function useDeletePatient() {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync: deletePatient } = useMutation({
    mutationFn: PatientService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['@patients'],
      });
    },
  });

  return {
    isDeletingPatient: isPending,
    deletePatient,
  };
}

export function useUpdatePatient(patientId: string) {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: PatientService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`@patients-${patientId}`, patientId],
      });
    },
  });

  return {
    isUpdatingPatient: isPending,
    updatePatient: mutateAsync,
  };
}
