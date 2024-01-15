import AppProvider from '@godiet-components/AppProvider';
import HeaderPatient from '@godiet-components/HeaderPatient';
import Button from '@godiet-ui/Button';
import Card from '@godiet-ui/Card';
import Text from '@godiet-ui/Text';

import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';

import { useAnamneseHook } from './Anamnese.hook';
import * as styled from './Anamnese.styles';
import ModalSelecteCreateAnamnesis from './ModalSelectCreateAnamnesis';
import ModalShowAnamnesis from './ModalShowAnamnesis';

export function AnamnesePage() {
  const {
    patient,
    modalSelecteAnamnesisIsOpen,
    isLoading,
    hasAnamnesis,
    anamnesis,
    modalShowAnamnesisIsOpen,
    selectedAnamnesis,
    toggleModalSelectAnamnesis,
    toggleModalShowAnamnesis,
    handleSelectAnamnesis,
  } = useAnamneseHook();

  return (
    <AppProvider
      className="anamnese"
      title="Anamnese"
      isLoading={isLoading}
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

          {hasAnamnesis ? (
            <>
              {anamnesis.map((anamnese) => {
                return (
                  <Card.Root key={anamnese.id}>
                    <Card.Header
                      extra={
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <Button
                            variant="ghost"
                            onClick={() => handleSelectAnamnesis(anamnese)}
                          >
                            <ViewIcon />
                          </Button>
                          <Button variant="ghost" cursor={'not-allowed'}>
                            <EditIcon />
                          </Button>
                          <Button variant="danger" cursor={'not-allowed'}>
                            <DeleteIcon />
                          </Button>
                        </div>
                      }
                    >
                      {anamnese.title}
                    </Card.Header>
                    <Card.Body paddingTop={0}>
                      <Text>Criado em {anamnese.createdAt}</Text>
                    </Card.Body>
                  </Card.Root>
                );
              })}
            </>
          ) : (
            <styled.AnamneseEmpty>
              <div>
                <Text fontWeight={600} fontSize={'24px'} align={'center'}>
                  Nenhuma anamnese criada
                </Text>
                <Text align={'center'} color="#444">
                  Você pode criar a sua anamnese ou usar os modelos propostos
                  pelo goDiet. A anamnese é importante para se ter um registro
                  da condição inicial do paciente e ser um importante fator na
                  hora de elaborar a conduta nutricional.
                </Text>
              </div>
              <Button onClick={toggleModalSelectAnamnesis}>
                Criar anamnese
              </Button>
            </styled.AnamneseEmpty>
          )}

          <ModalSelecteCreateAnamnesis
            patientId={patient.id}
            isOpen={modalSelecteAnamnesisIsOpen}
            onClose={toggleModalSelectAnamnesis}
          />

          <ModalShowAnamnesis
            isOpen={modalShowAnamnesisIsOpen}
            onClose={toggleModalShowAnamnesis}
            anamnesis={selectedAnamnesis}
          />
        </>
      )}
    </AppProvider>
  );
}
