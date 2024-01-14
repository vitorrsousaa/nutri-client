import { useMutation, useQuery, useQueryClient } from '@godiet-query';
import PatientService from '@godiet-services/Patient';

import { useAuth } from './useAuth';

export function useGetAllPatients() {
  const auth = useAuth();

  const {
    data: patients,
    isFetching,
    isPending,
    refetch: refetchPatients,
  } = useQuery({
    queryKey: ['@patients', auth?.userId],
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
  const auth = useAuth();

  const { isPending, mutateAsync: createPatient } = useMutation({
    mutationFn: PatientService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['@patients', auth?.userId],
      });
    },
  });

  return {
    isCreatingPatien: isPending,
    createPatient,
  };
}

export function useFindPatientById(id: string | undefined) {
  const queryClient = useQueryClient();

  const {
    data: patientRequested,
    isFetching,
    isPending,
  } = useQuery({
    queryKey: [`@patients-${id && id}`, id],
    queryFn: () => PatientService.findById(id),
  });

  function removePatient() {
    queryClient.invalidateQueries({
      queryKey: [`@patients-${id && id}`, id],
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

export function useUpdatePatient(id: string) {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: PatientService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`@patients-${id}`, id],
      });
    },
  });

  return {
    isUpdatingPatient: isPending,
    updatePatient: mutateAsync,
  };
}
