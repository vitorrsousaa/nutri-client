import AppProvider from '@godiet-components/AppProvider';
import HeaderPatient from '@godiet-components/HeaderPatient';
import { TPatient } from '@godiet-entities/patient/TPatient';
import Button from '@godiet-ui/Button';
import Card from '@godiet-ui/Card';
import Divider from '@godiet-ui/Divider';
import FormField from '@godiet-ui/FormField';
import Input from '@godiet-ui/Input';
import Text from '@godiet-ui/Text';

import { Stack } from '@chakra-ui/layout';
import { FormProvider } from 'react-hook-form';

import { useCreateAnthropometryHook } from './useCreateAnthropometry';

export function CreateAnthropometry() {
  const patientMock: TPatient = {
    email: 'patient@patient.com',
    id: 'any_patient_id',
    name: 'Patient Name',
    birthDate: new Date('1990-01-01'),
  };

  const {
    getClassificationOfIMC,
    methods,
    handleSubmit,
    errors,
    formIsValid,
    watchHeight,
    getIMC,
    watchWeight,
    isCreatingAnthropometry,
  } = useCreateAnthropometryHook();

  return (
    <AppProvider title="Criar antropometria" hasBackButton>
      <HeaderPatient patient={patientMock} />
      <Divider />
      <FormProvider {...methods}>
        <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
          <form
            style={{
              border: 'solid 1px #ddd',
              borderRadius: '8px',
              display: 'flex',
              padding: '16px',
              flexDirection: 'column',
              gap: '16px',
              width: '100%',
            }}
            onSubmit={handleSubmit}
          >
            <Text fontSize={'18px'}>Avaliação antropométrica</Text>
            <div>
              <FormField
                label="Data da avaliação"
                name="date"
                errorMessage={errors.date?.message}
              >
                <Input type="date" />
              </FormField>
            </div>
            <div>
              <Text>Dados antropométricos básicos:</Text>
              <div style={{ display: 'flex', gap: '16px' }}>
                <FormField
                  isInvalid={Boolean(errors.weight)}
                  name="weight"
                  errorMessage={errors.weight?.message}
                >
                  <Input type="number" placeholder="Peso (kg)" />
                </FormField>
                <FormField
                  name="height"
                  isInvalid={Boolean(errors.height)}
                  errorMessage={errors.height?.message}
                >
                  <Input type="number" placeholder="Altura (cm)" />
                </FormField>
              </div>
            </div>

            <Button
              type="submit"
              isDisabled={!formIsValid}
              isLoading={isCreatingAnthropometry}
            >
              Salvar alterações
            </Button>
          </form>

          <div
            style={{
              border: 'solid 1px #ddd',
              borderRadius: '8px',
              display: 'flex',
              padding: '16px',
              flexDirection: 'column',
              gap: '16px',
              width: '750px',
            }}
          >
            <Text fontSize={'18px'}>Resultados</Text>
            <div>
              <div>
                <Card.Root backgroundColor={'transparent'}>
                  <Card.Header>Pesos e medidas</Card.Header>
                  <Card.Body>
                    <Stack divider={<Divider />} spacing={'4'}>
                      <Stack
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                      >
                        <Text>Peso atual</Text>
                        <Text>
                          {watchWeight ? `${watchWeight} kg` : '0 kg'}
                        </Text>
                      </Stack>
                      <Stack
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                      >
                        <Text>Altura atual</Text>
                        <Text>
                          {watchHeight ? `${watchHeight / 100} m` : '0 m'}
                        </Text>
                      </Stack>
                      <Stack
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                      >
                        <Text>Índice de massa corporal</Text>
                        <Text>
                          {watchWeight && watchHeight
                            ? `${getIMC} Kg/m2`
                            : '0 Kg/m2'}
                        </Text>
                      </Stack>
                      <Stack
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                      >
                        <Text>Classificação do IMC</Text>
                        <Text>{getClassificationOfIMC}</Text>
                      </Stack>
                    </Stack>
                  </Card.Body>
                </Card.Root>
              </div>
            </div>
          </div>
        </div>
      </FormProvider>
    </AppProvider>
  );
}
