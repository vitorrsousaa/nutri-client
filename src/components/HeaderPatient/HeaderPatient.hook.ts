import { useMemo } from 'react';

import { addHours, differenceInYears, format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { HeaderPatientProps } from './HeaderPatient';

export function useHeaderPatientHook(props: HeaderPatientProps) {
  const { patient } = props;

  const formatedBirthDate = useMemo(() => {
    if (patient.birthDate) {
      const patientBirthDate = new Date(patient.birthDate);
      const currentDate = new Date();

      const date = format(
        addHours(patientBirthDate, 4),
        // eslint-disable-next-line quotes
        "d 'de' MMMM 'de' yyyy",
        {
          locale: ptBR,
        }
      );

      const years = differenceInYears(
        currentDate,
        parseISO(patientBirthDate.toISOString())
      );

      return date + ` (${years} anos)`;
    }

    return 'Sem cadastro';
  }, [patient.birthDate]);

  return {
    formatedBirthDate,
  };
}
