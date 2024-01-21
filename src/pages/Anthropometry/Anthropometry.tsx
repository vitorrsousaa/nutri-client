import AppProvider from '@godiet-components/AppProvider';
import HeaderPatient from '@godiet-components/HeaderPatient';
import Button from '@godiet-ui/Button';
import Text from '@godiet-ui/Text';

import { useAnthropometryHook } from './Anthropometry.hook';
import * as styled from './Anthropometry.styles';

export function Anthropometry() {
  const {
    patient,
    isFetchingPatient,
    hasAnthropometry,
    handleNavigateToNewAnthropometry,
  } = useAnthropometryHook();

  return (
    <AppProvider
      title="Antropometria"
      hasBackButton
      isLoading={isFetchingPatient}
    >
      {patient && (
        <>
          <HeaderPatient patient={patient} />

          {hasAnthropometry ? (
            <h1>O usuário já tem uma criada</h1>
          ) : (
            <styled.AnthropometryEmpty>
              <div>
                <Text fontWeight={600} fontSize={'24px'} align={'center'}>
                  Nenhuma avalição antropométrica criada
                </Text>
                <Text align={'center'} color="#444">
                  Há 2 tipos de antropometricas que são utilizadas no goDiet: A
                  avaliação antropométrica para adultos e a avaliação
                  antropométrica para crianças.
                </Text>
              </div>
              <Button
                onClick={() => handleNavigateToNewAnthropometry(patient.id)}
              >
                Nova avaliação antropométrica
              </Button>
            </styled.AnthropometryEmpty>
          )}
        </>
      )}
    </AppProvider>
  );
}
