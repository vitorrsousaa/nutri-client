import AntropometricService from '@godiet-services/Antropometric';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useCreateAnthropometry(patientId?: string) {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: AntropometricService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['@anthropometry', patientId && patientId],
      });
    },
  });

  return {
    isCreatingAnthropometry: isPending,
    createAnthropometry: mutateAsync,
  };
}

export function useDeleteAntropometry(patientId: string) {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: AntropometricService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['@anthropometry', patientId],
      });
    },
  });

  return {
    isDeletingAnthropometry: isPending,
    deleteAnthropometry: mutateAsync,
  };
}

export function useGetAllAntropometry(patientId: string) {
  const {
    data: anthropometry,
    isPending,
    isFetching: isFetchingAnthropometry,
    refetch: refetchAnthropometry,
  } = useQuery({
    queryKey: ['@anthropometry', patientId],
    queryFn: () => AntropometricService.getAll(patientId || ''),
    enabled: !!patientId,
  });

  return {
    anthropometry: anthropometry ?? [],
    isFetchingAnthropometry: isFetchingAnthropometry || isPending,
    refetchAnthropometry,
  };
}
