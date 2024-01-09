import { useCallback, useMemo, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { useFindPatientById } from '../../hooks/patients';

import { useGeneratePDF } from './hooks/generatePDF';

export function usePatientHook() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { patient, isFetchingPatient } = useFindPatientById(id);

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
    navigate,
    toggleModalEditPatient,
    handleExportPDF,
  };
}
