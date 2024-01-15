import { useQuery } from '@godiet-query';
import AnamnesisTemplateService from '@godiet-services/AnamnesisTemplate';

export function useGetAllAnamneseTemplate(options?: { enabled?: boolean }) {
  const {
    data: anamnesisTemplate,
    isPending,
    isFetching: isFetchingAnamnesisTemplate,
    refetch: refetchAnamneseTemplate,
  } = useQuery({
    queryKey: ['@anamnesisTemplate'],
    queryFn: AnamnesisTemplateService.getAll,
    enabled: options?.enabled,
  });

  return {
    anamnesisTemplate: anamnesisTemplate ?? [],
    isFetchingAnamnesisTemplate: isFetchingAnamnesisTemplate || isPending,
    refetchAnamneseTemplate,
  };
}
