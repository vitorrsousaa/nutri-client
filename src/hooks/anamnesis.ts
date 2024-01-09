import AnamnesisService from '@godiet-services/Anamnesis';

import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateAnamnesis() {
  const queryClient = useQueryClient();

  const { isLoading: isCreatingAnamnesis, mutateAsync: createAnamnesis } =
    useMutation({
      mutationFn: AnamnesisService.create,
      onSuccess: () => {
        queryClient.invalidateQueries(['@anamnesis']);
      },
    });

  return {
    isCreatingAnamnesis,
    createAnamnesis,
  };
}
