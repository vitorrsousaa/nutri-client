import AppProvider from '@godiet-components/AppProvider';
import HeaderPatient from '@godiet-components/HeaderPatient';
import Button from '@godiet-ui/Button';
import Text from '@godiet-ui/Text';

import { useAnamneseHook } from './Anamnese.hook';

export function AnamnesePage() {
  const { patient, isFetchingPatient } = useAnamneseHook();

  return (
    <AppProvider
      className="anamnese"
      title="Anamnese"
      isLoading={isFetchingPatient}
      hasBackButton
      hasError={!patient}
      errorMessage={
        <>
          <Text as="small" color="#333" align={'center'}>
            Não foi possível encontrar esse paciente no nosso banco de dados
          </Text>
          <Text as="strong">Por favor, tente novamente!</Text>
        </>
      }
    >
      {patient && (
        <>
          <HeaderPatient patient={patient} />

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              maxWidth: '600px',
              margin: '0 auto',
              gap: '32px',
            }}
          >
            <div>
              <Text fontWeight={600} fontSize={'24px'} align={'center'}>
                Nenhuma anamnese criada
              </Text>
              <Text align={'center'} color="#444">
                Você pode criar a sua anamnese ou usar os modelos propostos pelo
                goDiet. A anamnese é importante para se ter um registro da
                condição inicial do paciente e ser um importante fator na hora
                de elaborar a conduta nutricional.
              </Text>
            </div>
            <Button>Criar anamnese</Button>
          </div>
        </>
      )}
    </AppProvider>
  );
}
