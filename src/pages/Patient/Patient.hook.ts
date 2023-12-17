import { useCallback, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { useFindPatientById } from '../../hooks/patients';

export function usePatientHook() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { patient, isFetchingPatient } = useFindPatientById(id);

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
    redirectToCreatePlanning,
    toggleModalEditPatient,
  };
}
