import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';

import { useGetAllPatients } from '../../hooks/patients';
import { useAuth } from '../../hooks/useAuth';

export function useDashboardHook() {
  const navigate = useNavigate();

  const { patients, isFetchingPatients } = useGetAllPatients();

  const { name } = useAuth();

  const [modalCreatePatientIsOpen, setModalCreatePatientIsOpen] =
    useState(false);

  const toggleModalCreatePatient = useCallback(() => {
    setModalCreatePatientIsOpen((prevState) => !prevState);
  }, [setModalCreatePatientIsOpen]);

  return {
    modalCreatePatientIsOpen,
    isFetchingPatients,
    patients,
    name,
    navigate,
    toggleModalCreatePatient,
  };
}
