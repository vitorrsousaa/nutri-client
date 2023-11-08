import { useCallback, useState } from 'react';

export function useDashboardHook() {
  const [modalCreatePatientIsOpen, setModalCreatePatientIsOpen] =
    useState(false);

  const toggleModalCreatePatient = useCallback(() => {
    setModalCreatePatientIsOpen((prevState) => !prevState);
  }, [setModalCreatePatientIsOpen]);

  return {
    modalCreatePatientIsOpen,
    toggleModalCreatePatient,
  };
}
