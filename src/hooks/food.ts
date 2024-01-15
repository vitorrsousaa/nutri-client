import { useQuery } from '@godiet-query';
import FoodService from '@godiet-services/Food';

import { TOriginFoodEnum } from '../entities/food/origin/TOrigin';

export function useGetAllFoods(origin: TOriginFoodEnum) {
  const {
    data: foods,
    isFetching,
    isPending,
    refetch: refetchFoods,
  } = useQuery({
    queryKey: ['@foods', origin],
    queryFn: () => FoodService.getAll(origin),
  });

  return {
    foods: foods ?? [],
    isFetchingFoods: isFetching || isPending,
    refetchFoods,
  };
}
