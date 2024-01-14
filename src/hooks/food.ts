import { useQuery } from '@godiet-query';
import FoodService from '@godiet-services/Food';

import { TOriginFoodEnum } from '../entities/food/origin/TOrigin';

import { useAuth } from './useAuth';

export function useGetAllFoods(origin: TOriginFoodEnum) {
  const auth = useAuth();

  const {
    data: foods,
    isFetching,
    isPending,
    refetch: refetchFoods,
  } = useQuery({
    queryKey: ['@foods', origin, auth?.userId],
    queryFn: () => FoodService.getAll(origin),
    staleTime: Infinity,
  });

  return {
    foods: foods ?? [],
    isFetchingFoods: isFetching || isPending,
    refetchFoods,
  };
}
