import { useCallback, useMemo, useState } from 'react';

import { useFindPlanningByPatientId } from '@godiet-hooks/planningMeal';

import { useNavigate, useParams } from 'react-router-dom';

import { useFindPatientById } from '../../hooks/patients';

import { useGeneratePDF } from './hooks/generatePDF';

export function usePatientHook() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { patient, isFetchingPatient } = useFindPatientById(id);

  const { exportElementRef, isGeneratingPDF, generatePDF } = useGeneratePDF();

  const hasPlanning = useMemo(() => !!patient?.planningMeal?.length, [patient]);

  const { planningByPatientId, isFetchingPlanningByPatientId } =
    useFindPlanningByPatientId(id, {
      enabled: hasPlanning,
    });

  const [modalEditPatientIsOpen, setModalEditPatientIsOpen] = useState(false);

  const redirectToCreatePlanning = useCallback(() => {
    navigate(`/pacientes/${id}/plano/criar`);
  }, [id, navigate]);

  const toggleModalEditPatient = useCallback(() => {
    setModalEditPatientIsOpen((state) => !state);
  }, [setModalEditPatientIsOpen]);

  const handleExportPDF = useCallback(async () => {
    await generatePDF(`Plano alimentar - ${patient?.name}`);
  }, [generatePDF, patient?.name]);

  return {
    isFetchingPatient,
    patient,
    modalEditPatientIsOpen,
    hasPlanning,
    exportElementRef,
    planningMeal: planningByPatientId!,
    isFetchingPlanningMeal: isFetchingPlanningByPatientId,
    isGeneratingPDF,
    redirectToCreatePlanning,
    toggleModalEditPatient,
    handleExportPDF,
  };
}
