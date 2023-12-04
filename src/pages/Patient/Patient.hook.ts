import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useDeletePatient, useFindByIdPatient } from '../../hooks/patients';
import { useAuth } from '../../hooks/useAuth';

export function usePatientHook() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { name } = useAuth();

  const { patient, isFetchingPatient } = useFindByIdPatient(id);

  const { deletePatient, isDeletingPatient } = useDeletePatient();

  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);

  const toggleModalDeletePatient = useCallback(() => {
    setModalDeleteIsOpen((prevState) => !prevState);
  }, [setModalDeleteIsOpen]);

  const handleDeletePatient = useCallback(async () => {
    try {
      await deletePatient(id);

      toast.success('Paciente deletado com sucesso');
    } catch {
      toast.error('Tivemos um erro para deletar o paciente');
    } finally {
      toggleModalDeletePatient();

      navigate('/dashboard');
    }
  }, [deletePatient, id, navigate, toggleModalDeletePatient]);

  const redirectToCreatePlanning = useCallback(() => {
    navigate(`/pacientes/${id}/plano/criar`);
  }, [id, navigate]);

  return {
    modalDeleteIsOpen,
    isFetchingPatient,
    patient,
    isDeletingPatient,
    name,
    toggleModalDeletePatient,
    handleDeletePatient,
    redirectToCreatePlanning,
  };
}
