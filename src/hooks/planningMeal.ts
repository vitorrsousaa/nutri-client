import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import PlanningMealService from '../service/Planning';

export function useCreatePlanningMeal(patientId: string) {
  const queryClient = useQueryClient();

  const { isLoading: isCreatingPlanningMeal, mutateAsync: createPlanningMeal } =
    useMutation({
      mutationFn: PlanningMealService.create,
      onSuccess: () => {
        queryClient.invalidateQueries([
          '@planningMeal',
          `@patients-${patientId}`,
          patientId,
        ]);
      },
    });

  return {
    isCreatingPlanningMeal,
    createPlanningMeal,
  };
}

interface useFindPlanningByPatientIdOptions {
  enabled?: boolean;
}

export function useFindPlanningByPatientId(
  id: string | undefined,
  options: useFindPlanningByPatientIdOptions
) {
  const { enabled: enabledOptions } = options;

  const {
    isLoading: isFetchingPlanningByPatientId,
    data: planningByPatientId,
    refetch: refetchPlanningByPatientId,
  } = useQuery(
    [`@planningMeal-${id}`, id],
    () => PlanningMealService.findByPatientId(id),
    {
      enabled: enabledOptions,
    }
  );

  return {
    isFetchingPlanningByPatientId,
    planningByPatientId,
    refetchPlanningByPatientId,
  };
}
