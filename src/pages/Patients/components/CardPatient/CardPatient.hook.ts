import { useMemo } from 'react';

import { CardPatientProps } from './CardPatient';

export function useCardPatientHook(props: CardPatientProps) {
  const { patient } = props;

  const formatedBirthDate = useMemo(() => {
    const date = new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
    }).format(new Date(patient.birthDate));

    const currentDate = new Date();

    const years =
      currentDate.getFullYear() - new Date(patient.birthDate).getFullYear();

    return date + `, ${years} anos`;
  }, [patient.birthDate]);

  return {
    formatedBirthDate,
  };
}
