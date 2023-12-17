import { useCallback, useMemo, useState } from 'react';

import { useFindPlanningByPatientId } from '@godiet-hooks/planningMeal';

import { useNavigate, useParams } from 'react-router-dom';

import { useFindPatientById } from '../../hooks/patients';

export function usePatientHook() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { patient, isFetchingPatient } = useFindPatientById(id);

  const hasPlanning = useMemo(() => !!patient?.planningMeal?.length, [patient]);

  const { planningByPatientId } = useFindPlanningByPatientId(id, {
    enabled: hasPlanning,
  });

  console.log(planningByPatientId);

  const [modalEditPatientIsOpen, setModalEditPatientIsOpen] = useState(false);

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
    redirectToCreatePlanning,
    toggleModalEditPatient,
  };
}
