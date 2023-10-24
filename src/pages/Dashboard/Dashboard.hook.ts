import { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import PatientService from '../../service/Patient';

export function useDashboardHook() {
  const [modalCreatePatientIsOpen, setModalCreatePatientIsOpen] =
    useState(false);
  const [modalDeletePatientIsOpen, setModalDeletePatientIsOpen] =
    useState(false);

  const { data, isLoading, isError, remove } = useQuery({
    queryKey: ['all_patients'],
    queryFn: PatientService.getAll,
  });

  useEffect(() => {
    if (isError) {
      toast.error('Erro ao carregar pacientes');
    }
  }, [remove, isError]);

  function handleCloseModalDeletePatient() {
    setModalDeletePatientIsOpen(false);
  }

  function handleOpenModalDeletePatient() {
    setModalDeletePatientIsOpen(true);
  }

  function handleCloseModalCreatePatient() {
    setModalCreatePatientIsOpen(false);
  }

  function handleOpenModalCreatePatient() {
    setModalCreatePatientIsOpen(true);
  }

  const handleDeletePatient = useCallback(async () => {
    console.log('deletando o patient');

    handleCloseModalDeletePatient();
  }, []);

  return {
    modalCreatePatientIsOpen,
    handleCloseModalCreatePatient,
    handleOpenModalCreatePatient,
    modalDeletePatientIsOpen,
    handleCloseModalDeletePatient,
    handleOpenModalDeletePatient,
    handleDeletePatient,
    data,
    isLoading,
  };
}
