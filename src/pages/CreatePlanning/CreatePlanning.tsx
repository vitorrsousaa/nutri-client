import { DevTool } from '@hookform/devtools';
import { FormProvider } from 'react-hook-form';

import Button from '../../libs/ui/components/Button';
import FormField from '../../libs/ui/components/FormField';
import Input from '../../libs/ui/components/Input';

import MealForm from './components/MealForm';
import { useCreatePlanning } from './CreatePlanning.hook';

export function CreatePlanning() {
  const {
    isFetchingPatient,
    methods,
    meals,
    isValid,
    errors,
    control,
    returnPage,
    handleSubmit,
    handleRemoveMeal,
    handleAddNewMeal,
  } = useCreatePlanning();

  console.log(isValid);

  return (
    <div>
      <h1>create</h1>
      <DevTool control={control} />
      <Button onClick={returnPage}>Voltar</Button>
      {isFetchingPatient ? (
        <strong>isLoading</strong>
      ) : (
        <FormProvider {...methods}>
          <form
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
            onSubmit={handleSubmit}
          >
            <FormField
              label="Descrição"
              isInvalid={Boolean(errors.description)}
              name="description"
              errorMessage={errors.description?.message}
            >
              <Input placeholder="Descrição" />
            </FormField>

            <div>
              <h1>Refeições</h1>

              <div className="componente field-array">
                {meals.map((field, index) => (
                  <MealForm
                    key={field.id}
                    onRemoveMeal={handleRemoveMeal}
                    mealIndex={index}
                  />
                ))}
              </div>

              <Button
                type="button"
                onClick={handleAddNewMeal}
                colorScheme="blue"
              >
                adicionar refeição
              </Button>
            </div>

            <Button
              type="submit"
              isDisabled={!isValid}
              style={{ backgroundColor: isValid ? '#195' : '#ccc' }}
            >
              {isValid ? 'validao' : 'nada'}
              Cadastrar
            </Button>
          </form>
        </FormProvider>
      )}
    </div>
  );
}
