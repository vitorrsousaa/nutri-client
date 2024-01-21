import { useMutation, useQueryClient } from '@godiet-query';
import PlanningMealService from '@godiet-services/Planning';

export function useCreatePlanningMeal(patientId: string) {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync: createPlanningMeal } = useMutation({
    mutationFn: PlanningMealService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['@planningMeal', `@patients-${patientId}`, patientId],
      });
    },
  });

  return {
    isCreatingPlanningMeal: isPending,
    createPlanningMeal,
  };
}
