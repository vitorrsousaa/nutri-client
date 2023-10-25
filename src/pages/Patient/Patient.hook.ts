import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useDeletePatient, useFindByIdPatient } from '../../hooks/patients';

export function usePatientHook() {
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);

  const { id } = useParams<{ id: string }>();

  const { patient, isFetchingPatient } = useFindByIdPatient(id);

  const { deletePatient, isDeletingPatient } = useDeletePatient();

  const navigate = useNavigate();

  const handleCloseModalDelete = useCallback(() => {
    setModalDeleteIsOpen(false);
  }, []);

  const handleOpenModalDelete = useCallback(() => {
    setModalDeleteIsOpen(true);
  }, []);

  const returnPage = useCallback(() => {
    navigate('/dashboard');
  }, []);

  const handleDeletePatient = useCallback(async () => {
    try {
      await deletePatient(id);

      toast.success('Paciente deletado com sucesso');
    } catch {
      toast.error('Tivemos um erro para deletar o paciente');
    } finally {
      handleCloseModalDelete();

      returnPage();
    }
  }, []);

  return {
    modalDeleteIsOpen,
    handleCloseModalDelete,
    handleOpenModalDelete,
    handleDeletePatient,
    returnPage,
    isFetchingPatient,
    patient,
    isDeletingPatient,
  };
}
