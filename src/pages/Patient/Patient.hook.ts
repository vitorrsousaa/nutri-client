import { useCallback, useMemo, useState } from 'react';

import { usePrefetchAnamnesis } from '@godiet-hooks/anamnesis';
import { useFindPatientById } from '@godiet-hooks/patients';
import { useGeneratePDF } from '@godiet-hooks/usePdf';

import { useNavigate, useParams } from 'react-router-dom';

export function usePatientHook() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { patient, isFetchingPatient } = useFindPatientById(id);

  const prefetchAnamnesisByPatient = usePrefetchAnamnesis();

  const { exportElementRef, isGeneratingPDF, generatePDF } = useGeneratePDF();

  const hasPlanning = useMemo(() => !!patient?.planningMeal, [patient]);

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
    planningMeal: patient?.planningMeal,
    isGeneratingPDF,
    redirectToCreatePlanning,
    prefetchAnamnesisByPatient,
    navigate,
    toggleModalEditPatient,
    handleExportPDF,
  };
}
