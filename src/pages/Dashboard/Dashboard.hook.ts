import { useState } from 'react';

export function useDashboardHook() {
  const [modalCreatePatientIsOpen, setModalCreatePatientIsOpen] =
    useState(false);

  function handleCloseModalCreatePatient() {
    setModalCreatePatientIsOpen(false);
  }

  function handleOpenModalCreatePatient() {
    setModalCreatePatientIsOpen(true);
  }

  return {
    modalCreatePatientIsOpen,
    handleCloseModalCreatePatient,
    handleOpenModalCreatePatient,
  };
}
