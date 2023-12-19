import { useCallback, useMemo, useState } from 'react';

import { TMealFood } from '@godiet-entities/planning/TPlanningMeal';
import { useFindPlanningByPatientId } from '@godiet-hooks/planningMeal';
import { DataTotalType } from '@godiet-types/dataTotalType';

import { useNavigate, useParams } from 'react-router-dom';

import { useFindPatientById } from '../../hooks/patients';
import calculateAttributes from '../../utils/funcs/calculateAttributes';

export type DataChartType = Omit<DataTotalType, 'energy' | 'name'>;

export function usePatientHook() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { patient, isFetchingPatient } = useFindPatientById(id);

  const hasPlanning = useMemo(() => !!patient?.planningMeal?.length, [patient]);

  const { planningByPatientId, isFetchingPlanningByPatientId } =
    useFindPlanningByPatientId(id, {
      enabled: hasPlanning,
    });

  const [modalEditPatientIsOpen, setModalEditPatientIsOpen] = useState(false);

  const dataFoods = useMemo<TMealFood[]>(
    () =>
      planningByPatientId
        ? planningByPatientId.meals.map((meal) => meal.mealFoods).flat()
        : [],
    [planningByPatientId]
  );

  const getTotalAttributes = useCallback(() => {
    const total =
      calculateAttributes<TMealFood>('carbohydrate', dataFoods) +
      calculateAttributes<TMealFood>('lipid', dataFoods) +
      calculateAttributes<TMealFood>('protein', dataFoods);

    return total;
  }, [dataFoods]);

  const getPercentage = useCallback(
    (attribute: keyof DataChartType): number => {
      const total = getTotalAttributes();

      const percentage =
        total > 0
          ? (calculateAttributes<TMealFood>(attribute, dataFoods) / total) * 100
          : 0;

      return Math.round(percentage);
    },
    [dataFoods, getTotalAttributes]
  );

  const dataChart = useMemo<DataChartType>(() => {
    return {
      carbohydrate: getPercentage('carbohydrate'),
      lipid: getPercentage('lipid'),
      protein: getPercentage('protein'),
    };
  }, [getPercentage]);

  const redirectToCreatePlanning = useCallback(() => {
    navigate(`/pacientes/${id}/plano/criar`);
  }, [id, navigate]);

  const toggleModalEditPatient = useCallback(() => {
    setModalEditPatientIsOpen((state) => !state);
  }, [setModalEditPatientIsOpen]);

  return {
    isFetchingPatient,
    patient,
    modalEditPatientIsOpen,
    hasPlanning,
    dataChart,
    planningMeal: planningByPatientId!,
    isFetchingPlanningMeal: isFetchingPlanningByPatientId,
    redirectToCreatePlanning,
    toggleModalEditPatient,
  };
}
