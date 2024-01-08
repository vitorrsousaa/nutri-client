import { useState } from 'react';

import AppProvider from '@godiet-components/AppProvider';
import HeaderPatient from '@godiet-components/HeaderPatient';
import Button from '@godiet-ui/Button';
import Divider from '@godiet-ui/Divider';
import FormField from '@godiet-ui/FormField';
import Input from '@godiet-ui/Input';
import Text from '@godiet-ui/Text';

import { AddIcon } from '@chakra-ui/icons';
import { DevTool } from '@hookform/devtools';
import { FormProvider } from 'react-hook-form';

import MealForm from './components/MealForm';
import SummaryPlanning from './components/SummaryPlanning';
import { useCreatePlanning } from './CreatePlanning.hook';
import * as styled from './CreatePlanning.styles';

export function CreatePlanning() {
  const {
    isFetchingPatient,
    methods,
    meals,
    isValid,
    errors,
    control,
    patient,
    hasMeals,
    // isCreatingPlanningMeal,
    handleSubmit,
    handleRemoveMeal,
    handleAddNewMeal,
  } = useCreatePlanning();

  // const isCreatingPlanningMeal = true;

  const [isCreatingPlanningMeal, setisCreatingPlanningMeal] = useState(false);

  return (
    <>
      <AppProvider
        className="create-planning"
        title="Criar planejamento"
        isLoading={isFetchingPatient}
        hasError={!patient}
        errorMessage={<>Não encontramos o paciente</>}
        hasBackButton
      >
        <DevTool control={control} />

        {patient && (
          <>
            <HeaderPatient patient={patient} />
            <Divider />
            <FormProvider {...methods}>
              <styled.CreatePlanningContainerForm onSubmit={handleSubmit}>
                <button
                  onClick={() =>
                    setisCreatingPlanningMeal((prevState) => !prevState)
                  }
                >
                  click
                </button>
                <FormField
                  label="Descrição"
                  isInvalid={Boolean(errors.description)}
                  name="description"
                  errorMessage={errors.description?.message}
                  maxWidth={600}
                >
                  <Input placeholder="Descrição do planejamento alimentar" />
                </FormField>

                <Text fontSize={'16px'} fontWeight={500} as="h2">
                  Refeições
                </Text>

                <styled.CreatePlanningContainerMeals>
                  <div className="container-meals">
                    <div className="container-field-meals">
                      {meals.map((field, index) => (
                        <MealForm
                          key={`${field.name}-${index}`}
                          onRemoveMeal={handleRemoveMeal}
                          mealIndex={index}
                          isCreatingPlanningMeal={isCreatingPlanningMeal}
                        />
                      ))}
                    </div>
                    {hasMeals && <SummaryPlanning control={control} />}
                  </div>

                  <div className="container-cta-actions">
                    {!hasMeals && (
                      <Text as="small" color="#444" fontSize={'16px'}>
                        Este planejamento alimentar ainda não possui refeições.
                      </Text>
                    )}

                    <Button
                      type="button"
                      onClick={handleAddNewMeal}
                      colorScheme="blue"
                      leftIcon={<AddIcon />}
                      isDisabled={isCreatingPlanningMeal}
                    >
                      Adicionar refeição
                    </Button>
                  </div>
                </styled.CreatePlanningContainerMeals>

                <Divider />

                <Button
                  type="submit"
                  isDisabled={!isValid}
                  isLoading={isCreatingPlanningMeal}
                >
                  Cadastrar
                </Button>
              </styled.CreatePlanningContainerForm>
            </FormProvider>
          </>
        )}
      </AppProvider>
    </>
  );
}
