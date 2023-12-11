import { useCallback, useState } from 'react';

import { useGetAllPatients } from '../../hooks/patients';

export function usePatientsHook() {
  const [modalCreatePatientIsOpen, setModalCreatePatientIsOpen] =
    useState(false);

  const { patients, isFetchingPatients } = useGetAllPatients();

  const toggleModalCreatePatient = useCallback(() => {
    setModalCreatePatientIsOpen((prevState) => !prevState);
  }, []);

  return {
    patients,
    modalCreatePatientIsOpen,
    isFetchingPatients,
    toggleModalCreatePatient,
  };
}
