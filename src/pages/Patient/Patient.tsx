import AppProvider from '@godiet-components/AppProvider';
import HeaderPatient from '@godiet-components/HeaderPatient';
import Button from '@godiet-ui/Button';
import Text from '@godiet-ui/Text';

import { DeleteIcon, DownloadIcon } from '@chakra-ui/icons';
import { AttachmentIcon, InfoIcon } from '@chakra-ui/icons';
import { Center, Flex, HStack } from '@chakra-ui/layout';

import ModalEditPatient from './components/ModalEditPatient';
import PatientChartBarPlanning from './components/PatientChartBarPlanning';
import PatientContentPlanning from './components/PatientContentPlanning';
import PlanningExported from './components/PlanningExported';
import { usePatientHook } from './Patient.hook';
import * as styled from './Patient.styles';

export function Patient() {
  const {
    isFetchingPatient,
    patient,
    modalEditPatientIsOpen,
    hasPlanning,
    planningMeal,
    exportElementRef,
    isGeneratingPDF,
    redirectToCreatePlanning,
    prefetchAnamnesisByPatient,
    toggleModalEditPatient,
    handleExportPDF,
    navigate,
  } = usePatientHook();

  return (
    <AppProvider
      className="patient"
      title="Paciente"
      isLoading={isFetchingPatient}
      hasError={!patient}
      hasBackButton
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

          <Flex gap={'16px'} alignItems={'flex-start'} direction={'column'}>
            <Text fontWeight={500} fontSize={'20px'}>
              Escolha uma opção:
            </Text>
            <HStack>
              <styled.ActionButton onClick={toggleModalEditPatient}>
                <span>Editar dados</span>
                <InfoIcon color={'#111'} />
              </styled.ActionButton>

              <styled.ActionButton
                onClick={() => navigate(`/pacientes/${patient.id}/anamnese`)}
                onMouseEnter={() => prefetchAnamnesisByPatient(patient.id)}
              >
                <span>Anamnese </span>
                <AttachmentIcon color={'#111'} />
              </styled.ActionButton>

              <styled.ActionButton
                onClick={() => navigate(`/${patient.id}/antropometria`)}
              >
                <span>Antropometria</span>
                <InfoIcon color={'#111'} />
              </styled.ActionButton>
            </HStack>
            <HStack>
              <styled.ActionButton onClick={redirectToCreatePlanning}>
                <span>Planejamento alimentar</span>
                <InfoIcon color={'#111'} />
              </styled.ActionButton>
              <styled.ActionButton className="inactive">
                <span>Orientações nutricionais</span>
                <InfoIcon color={'#111'} />
              </styled.ActionButton>
              <styled.ActionButton className="inactive">
                <span>Cálculo energético</span>
                <InfoIcon color={'#111'} />
              </styled.ActionButton>
            </HStack>
          </Flex>

          <styled.PatientContainer>
            <div
              className={`header-planning ${hasPlanning ? 'has-planning' : ''}`}
            >
              <Text fontWeight={500} fontSize={'20px'}>
                Planejamento alimentar:
              </Text>
              {hasPlanning && (
                <div style={{ display: 'flex', gap: 16 }}>
                  <Button
                    variant="danger"
                    isDisabled={isGeneratingPDF}
                    cursor={'not-allowed'}
                  >
                    <DeleteIcon />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleExportPDF}
                    isLoading={isGeneratingPDF}
                  >
                    <DownloadIcon />
                  </Button>
                </div>
              )}
            </div>
            <Flex flexDirection={'column'} width={'100%'} id="planning">
              {!hasPlanning ? (
                <Center width={'100%'}>
                  <Text color="#333" align={'center'}>
                    O paciente {patient.name} ainda não possui planejamento
                    alimentar! Clique no botão{' '}
                    <Text fontWeight={700} color="##59BD5A" as="span">
                      “Planejamento alimentar”
                    </Text>
                    acima para cadastrar o planejamento alimentar.
                  </Text>
                </Center>
              ) : (
                <>
                  <PatientChartBarPlanning planningMeal={planningMeal!} />

                  <PatientContentPlanning planningMeal={planningMeal!} />

                  <PlanningExported
                    planningMeal={planningMeal!}
                    ref={exportElementRef}
                    patientName={patient.name}
                  />
                </>
              )}
            </Flex>
          </styled.PatientContainer>

          <ModalEditPatient
            isOpen={modalEditPatientIsOpen}
            onClose={toggleModalEditPatient}
            patient={patient}
          />
        </>
      )}
    </AppProvider>
  );
}
