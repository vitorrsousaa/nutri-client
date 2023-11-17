import { useMutation, useQueryClient } from '@tanstack/react-query';

import PlanningMealService from '../service/Planning';

export function useCreatePlanningMeal() {
  const queryClient = useQueryClient();

  const { isLoading: isCreatingPlanningMeal, mutateAsync: createPlanningMeal } =
    useMutation({
      mutationFn: PlanningMealService.create,
      onSuccess: () => {
        queryClient.invalidateQueries(['@planningMeal']);
      },
    });

  return {
    isCreatingPlanningMeal,
    createPlanningMeal,
  };
}
