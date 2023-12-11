import { useCallback, useMemo, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { CardPatientProps } from './CardPatient';

export function useCardPatientHook(props: CardPatientProps) {
  const { patient } = props;

  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);

  const navigate = useNavigate();

  const formatedBirthDate = useMemo(() => {
    if (patient.birthDate) {
      const date = new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short',
      }).format(new Date(patient.birthDate));

      const currentDate = new Date();

      const years =
        currentDate.getFullYear() - new Date(patient.birthDate).getFullYear();

      return date + `, ${years} anos`;
    }

    return 'Sem cadastro';
  }, [patient.birthDate]);

  const handleNavigateToPatient = useCallback(
    () => navigate(`/pacientes/${patient.id}`),
    [navigate, patient.id]
  );

  const toggleModalDeletePatient = useCallback(() => {
    setModalDeleteIsOpen((prevState) => !prevState);
  }, [setModalDeleteIsOpen]);

  return {
    formatedBirthDate,
    modalDeleteIsOpen,
    handleNavigateToPatient,
    toggleModalDeletePatient,
  };
}
