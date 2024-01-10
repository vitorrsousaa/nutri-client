import AnamnesisService from '@godiet-services/Anamnesis';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useCreateAnamnesis(id?: string) {
  const queryClient = useQueryClient();

  const { isLoading: isCreatingAnamnesis, mutateAsync: createAnamnesis } =
    useMutation({
      mutationFn: AnamnesisService.create,
      onSuccess: () => {
        queryClient.invalidateQueries([`@anamnesis-getAll-${id}`]);
      },
    });

  return {
    isCreatingAnamnesis,
    createAnamnesis,
  };
}

export function useGetAllAnamnesis(patientId?: string) {
  const {
    data: anamnesis,
    isFetching: isFetchingAnamnesis,
    refetch: refetchAnamnesis,
  } = useQuery({
    queryKey: [`@anamnesis-getAll-${patientId}`],
    queryFn: () => AnamnesisService.getAll(patientId || ''),
  });

  return {
    anamnesis: anamnesis ?? [],
    isFetchingAnamnesis,
    refetchAnamnesis,
  };
}
