import { useMutation, useQuery, useQueryClient } from '@godiet-query';
import AnamnesisService from '@godiet-services/Anamnesis';

export function useCreateAnamnesis(patientId?: string) {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync: createAnamnesis } = useMutation({
    mutationFn: AnamnesisService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['@anamnesis', patientId && patientId],
      });
    },
  });

  return {
    isCreatingAnamnesis: isPending,
    createAnamnesis,
  };
}

export function useGetAllAnamnesis(patientId?: string) {
  const {
    data: anamnesis,
    isPending,
    isFetching: isFetchingAnamnesis,
    refetch: refetchAnamnesis,
  } = useQuery({
    queryKey: ['@anamnesis', patientId],
    queryFn: () => AnamnesisService.getAll(patientId || ''),
  });

  return {
    anamnesis: anamnesis ?? [],
    isFetchingAnamnesis: isFetchingAnamnesis || isPending,
    refetchAnamnesis,
  };
}
