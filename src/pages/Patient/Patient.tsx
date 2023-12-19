import AppProvider from '@godiet-components/AppProvider';
import HeaderPatient from '@godiet-components/HeaderPatient';
import Button from '@godiet-ui/Button';
import Divider from '@godiet-ui/Divider';
import Spinner from '@godiet-ui/Spinner';
import Text from '@godiet-ui/Text';

import { DeleteIcon, DownloadIcon } from '@chakra-ui/icons';
import { AttachmentIcon, InfoIcon } from '@chakra-ui/icons';
import { Center, Flex, HStack } from '@chakra-ui/layout';

import ModalEditPatient from './ModalEditPatient';
import { DataChartType, usePatientHook } from './Patient.hook';
import * as styled from './Patient.styles';

export function Patient() {
  const {
    isFetchingPatient,
    patient,
    modalEditPatientIsOpen,
    hasPlanning,
    dataChart,
    isFetchingPlanningMeal,
    planningMeal,
    redirectToCreatePlanning,
    toggleModalEditPatient,
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
                <span>Avalição clínica</span>
                <InfoIcon color={'#111'} />
              </styled.ActionButton>
              {!hasPlanning && (
                <styled.ActionButton onClick={redirectToCreatePlanning}>
                  <span>Planejamento alimentar</span>
                  <AttachmentIcon color={'#111'} />
                </styled.ActionButton>
              )}
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
                  <Button variant="danger">
                    <DeleteIcon />
                  </Button>
                  <Button variant="ghost">
                    <DownloadIcon />
                  </Button>
                </div>
              )}
            </div>
            <Flex flexDirection={'column'} width={'100%'}>
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
              ) : !isFetchingPlanningMeal ? (
                <>
                  <styled.PatientChartBarPlanning chart={dataChart}>
                    {Object.keys(dataChart).map((key) => {
                      const value = dataChart[key as keyof DataChartType];

                      return (
                        <div key={key} className={`cell-chart ${key}`}>
                          {value > 1 && `${value}%`}
                        </div>
                      );
                    })}
                  </styled.PatientChartBarPlanning>

                  <Text fontSize={'18px'} fontWeight={500}>
                    Descrição:
                  </Text>
                  <Text fontSize={'16px'} as="small">
                    {planningMeal.description || 'Esse plano não tem descrição'}
                  </Text>

                  <Divider marginY={'16px'} />

                  {planningMeal.meals.map((meal, index) => {
                    return (
                      <styled.PatientContainerMeal key={`meal-${meal.id}`}>
                        <Text fontSize={'18px'} fontWeight={500}>
                          Refeição {index + 1}
                        </Text>
                        <Text as="small" className="small-text">
                          Nome: {meal.name}
                        </Text>
                        <Text as="small" className="small-text">
                          Horário: {meal.time}
                        </Text>
                        <Divider height={'1px'} />
                        {meal.mealFoods.map((mealFood) => {
                          return (
                            <div key={`meal-food-${mealFood.id}`}>
                              <Text>{mealFood.name}</Text>
                              <Text>
                                {mealFood.quantity} ({mealFood.baseUnit})
                              </Text>
                            </div>
                          );
                        })}
                      </styled.PatientContainerMeal>
                    );
                  })}
                </>
              ) : (
                <styled.PatientContainerLoadingPlanning>
                  <Spinner />
                </styled.PatientContainerLoadingPlanning>
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
