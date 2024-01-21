import { useCallback } from 'react';

import AppProvider from '@godiet-components/AppProvider';
import HeaderPatient from '@godiet-components/HeaderPatient';
import { TPatient } from '@godiet-entities/patient/TPatient';
import Accordion from '@godiet-ui/Accordion';
import Button from '@godiet-ui/Button';
import Card from '@godiet-ui/Card';
import Divider from '@godiet-ui/Divider';
import FormField from '@godiet-ui/FormField';
import Input from '@godiet-ui/Input';
import Text from '@godiet-ui/Text';

import { Stack } from '@chakra-ui/layout';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import * as z from 'zod';

const CreateAnthropometrySchema = z.object({
  weigth: z.number().positive(),
  height: z.number().positive(),
  date: z
    .string()
    .pipe(z.coerce.date())
    .refine((date) => date <= new Date(), {
      message: 'Data de avaliação não pode ser no futuro',
    }),
});

type TCreateAnthropometrySchema = z.infer<typeof CreateAnthropometrySchema>;

export function CreateAnthropometry() {
  const patientMock: TPatient = {
    email: 'patient@patient.com',
    id: 'any_patient_id',
    name: 'Patient Name',
    birthDate: new Date('1990-01-01'),
  };

  const methods = useForm<TCreateAnthropometrySchema>({
    resolver: zodResolver(CreateAnthropometrySchema),
  });

  const {
    handleSubmit: hookFormSubmit,
    formState: { errors, isValid: formIsValid },
    control,
  } = methods;

  const handleSubmit = hookFormSubmit((data) => {
    console.log(data);
  });

  const watchWeight = useWatch({
    control,
    name: 'weigth',
  });

  const watchHeight = useWatch({
    control,
    name: 'height',
  });

  const getClassificationOfIMC = useCallback((imc: number) => {
    if (imc < 18.5) {
      return 'Abaixo do peso';
    }

    if (imc >= 18.5 && imc < 24.9) {
      return 'Peso normal';
    }

    if (imc >= 25 && imc < 29.9) {
      return 'Sobrepeso';
    }

    if (imc >= 30 && imc < 34.9) {
      return 'Obesidade grau 1';
    }

    if (imc >= 35 && imc < 39.9) {
      return 'Obesidade grau 2';
    }

    if (imc >= 40) {
      return 'Obesidade grau 3';
    }
  }, []);

  return (
    <AppProvider title="Criar antropometria">
      <HeaderPatient patient={patientMock} />
      <Divider />
      <FormProvider {...methods}>
        <div style={{ display: 'flex', gap: '16px' }}>
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
              <Text>Data da avaliação</Text>
              <FormField
                label="Data da avaliação"
                name="date"
                errorMessage={errors.date?.message}
              >
                <Input type="date" />
              </FormField>
            </div>
            <Accordion.Root allowMultiple>
              <Accordion.Item>
                <Accordion.Header
                  buttonProps={{
                    fontSize: '16px',
                    fontWeight: '400',
                  }}
                >
                  <Text>Dados antropométricos básicos:</Text>
                </Accordion.Header>
                <Accordion.Panel>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <FormField
                      isInvalid={Boolean(errors.weigth)}
                      name="weight"
                      errorMessage={errors.weigth?.message}
                    >
                      <Input type="number" placeholder="Peso (kg)" />
                    </FormField>
                    <Input placeholder="Altura (cm)" />
                  </div>
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Header
                  buttonProps={{
                    fontSize: '16px',
                    fontWeight: '400',
                  }}
                >
                  Dobras cutâneas (mm)
                </Accordion.Header>
                <Accordion.Panel>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <Input placeholder="Dobra tricipital (mm)" />
                    <Input placeholder="Dobra bicipial (mm)" />
                  </div>
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Header
                  buttonProps={{
                    fontSize: '16px',
                    fontWeight: '400',
                  }}
                >
                  Circunferências corporais (cm)
                </Accordion.Header>
                <Accordion.Panel>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <Input placeholder="Circunferência da cintura (cm)" />
                    <Input placeholder="Circunferência do quadril (cm)" />
                  </div>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion.Root>
            <Button type="submit">Salvar alterações</Button>
          </form>

          <div
            style={{
              border: 'solid 1px #ddd',
              borderRadius: '8px',
              display: 'flex',
              padding: '16px',
              flexDirection: 'column',
              gap: '16px',
              minWidth: '600px',
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
                        <Text>{watchWeight} kg</Text>
                      </Stack>
                      <Stack
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                      >
                        <Text>Altura atual</Text>
                        <Text>{watchHeight / 100} m</Text>
                      </Stack>
                      <Stack
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                      >
                        <Text>Índice de massa corporal</Text>
                        <Text>
                          {watchWeight / watchHeight / watchHeight} Kg/m2
                        </Text>
                      </Stack>
                      <Stack
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                      >
                        <Text>Classificação do IMC</Text>
                        <Text>
                          {getClassificationOfIMC(
                            watchWeight / watchHeight / watchHeight
                          )}
                        </Text>
                      </Stack>
                      {/* <Stack
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                      >
                        <Text>Faixa de peso ideal</Text>
                        <Text>62.6 a 84.3 Kg</Text>
                      </Stack> */}
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
