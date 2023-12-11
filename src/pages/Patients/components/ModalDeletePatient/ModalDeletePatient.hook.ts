import { useCallback } from 'react';

import { toast } from 'react-toastify';

import { useDeletePatient } from '../../../../hooks/patients';

import { ModalDeletePatientProps } from './ModalDeletePatient';

export function useModalDeletePatientHook(props: ModalDeletePatientProps) {
  const { patientId, onClose } = props;

  const { deletePatient, isDeletingPatient } = useDeletePatient();

  const handleDeletePatient = useCallback(async () => {
    try {
      await deletePatient(patientId);

      toast.success('Paciente deletado com sucesso');
    } catch {
      toast.error('Tivemos um erro para deletar o paciente');
    } finally {
      onClose();
    }
  }, [deletePatient, onClose, patientId]);

  return {
    handleDeletePatient,
    isDeletingPatient,
  };
}
