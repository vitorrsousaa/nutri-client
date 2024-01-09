import AnamnesisTemplateService from '@godiet-services/AnamnesisTemplate';

import { useQuery } from '@tanstack/react-query';

export function useGetAllAnamneseTemplate(
  id: string = '',
  options?: {
    enabled?: boolean;
  }
) {
  const {
    data: anamnesisTemplate,
    isFetching: isFetchingAnamnesisTemplate,
    refetch: refetchAnamneseTemplate,
  } = useQuery({
    queryKey: [`@anamneseTemplate-${id && id}`, id],
    queryFn: AnamnesisTemplateService.getAll,
    enabled: options?.enabled,
  });

  return {
    anamnesisTemplate: anamnesisTemplate ?? [],
    isFetchingAnamnesisTemplate,
    refetchAnamneseTemplate,
  };
}
