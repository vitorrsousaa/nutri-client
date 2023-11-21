import { useMemo } from 'react';

import { HeaderProps } from './Header';

export function useHeaderHook(props: HeaderProps) {
  const { patient } = props;

  const formatedBirthDate = useMemo(() => {
    const date = new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'long',
    }).format(new Date(patient.birthDate));

    const currentDate = new Date();

    const years =
      currentDate.getFullYear() - new Date(patient.birthDate).getFullYear();

    return date + ` (${years} anos)`;
  }, [patient.birthDate]);

  return {
    formatedBirthDate,
  };
}
