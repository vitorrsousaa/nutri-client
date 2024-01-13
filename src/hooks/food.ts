import { useQuery } from '@godiet-query';

import { TOriginFoodEnum } from '../entities/food/origin/TOrigin';
import FoodService from '../service/Food';

export function useGetAllFoods(origin: TOriginFoodEnum) {
  const {
    data: foods,
    isFetching: isFetchingFoods,
    refetch: refetchFoods,
  } = useQuery({
    queryKey: ['@foods', origin],
    queryFn: () => FoodService.getAll(origin),
    staleTime: Infinity,
  });

  return {
    foods: foods ?? [],
    isFetchingFoods,
    refetchFoods,
  };
}
