import AppProvider from '@godiet-components/AppProvider';
import HeaderPatient from '@godiet-components/HeaderPatient';
import Button from '@godiet-ui/Button';
import Card from '@godiet-ui/Card';
import Text from '@godiet-ui/Text';

import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';

import { useAnthropometryHook } from './Anthropometry.hook';
import * as styled from './Anthropometry.styles';

export function Anthropometry() {
  const {
    patient,
    isFetchingPatient,
    hasAnthropometry,
    isFetchingAnthropometry,
    anthropometry,
    isDeletingAnthropometry,
    handleNavigateToNewAnthropometry,
    deleteAnthropometry,
  } = useAnthropometryHook();

  return (
    <AppProvider
      title="Antropometria"
      hasBackButton
      isLoading={isFetchingPatient || isFetchingAnthropometry}
    >
      {patient && (
        <>
          <HeaderPatient patient={patient} />

          {hasAnthropometry ? (
            <>
              {anthropometry.map((anth) => (
                <Card.Root key={anth.id}>
                  <Card.Header
                    extra={
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <Button variant="ghost" cursor={'not-allowed'}>
                          <ViewIcon />
                        </Button>
                        <Button variant="ghost" cursor={'not-allowed'}>
                          <EditIcon />
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() =>
                            deleteAnthropometry({
                              antropometricId: anth.id,
                              patientId: patient.id,
                            })
                          }
                          isLoading={isDeletingAnthropometry}
                        >
                          <DeleteIcon />
                        </Button>
                      </div>
                    }
                  >
                    <span>
                      Antropometria{' '}
                      {new Intl.DateTimeFormat('pt-br', {
                        dateStyle: 'short',
                      }).format(new Date(anth.date))}
                    </span>
                  </Card.Header>
                </Card.Root>
              ))}
              <Button
                onClick={() => handleNavigateToNewAnthropometry(patient.id)}
                isDisabled={isDeletingAnthropometry}
              >
                Nova avaliação antropométrica
              </Button>
            </>
          ) : (
            <styled.AnthropometryEmpty>
              <div>
                <Text fontWeight={600} fontSize={'24px'} align={'center'}>
                  Nenhuma avalição antropométrica criada
                </Text>
                <Text align={'center'} color="#444">
                  A avaliação antropométrica contém as dimensões físicas do
                  paciente, como peso, altura, circunferência da cintura, etc.
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
