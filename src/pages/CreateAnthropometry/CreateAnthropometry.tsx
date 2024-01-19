import AppProvider from '@godiet-components/AppProvider';
import HeaderPatient from '@godiet-components/HeaderPatient';
import { TPatient } from '@godiet-entities/patient/TPatient';
import Accordion from '@godiet-ui/Accordion';
import Button from '@godiet-ui/Button';
import Card from '@godiet-ui/Card';
import Divider from '@godiet-ui/Divider';
import Input from '@godiet-ui/Input';
import Text from '@godiet-ui/Text';

import { Stack } from '@chakra-ui/layout';

export function CreateAnthropometry() {
  const patientMock: TPatient = {
    email: 'patient@patient.com',
    id: 'any_patient_id',
    name: 'Patient Name',
    birthDate: new Date('1990-01-01'),
  };

  return (
    <AppProvider title="Criar antropometria">
      <HeaderPatient patient={patientMock} />
      <Divider />
      <div style={{ display: 'flex', gap: '16px' }}>
        <div
          style={{
            border: 'solid 1px #ddd',
            borderRadius: '8px',
            display: 'flex',
            padding: '16px',
            flexDirection: 'column',
            gap: '16px',
            width: '100%',
          }}
        >
          <Text fontSize={'18px'}>Avaliação antropométrica</Text>
          <div>
            <Text>Data da avaliação</Text>
            <Input type="date" />
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
                  <Input type="number" placeholder="Peso (kg)" />
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
          <Button>Salvar alterações</Button>
        </div>
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
                      <Text>74 kg</Text>
                    </Stack>
                    <Stack
                      flexDirection={'row'}
                      justifyContent={'space-between'}
                    >
                      <Text>Altura atual</Text>
                      <Text>1.84 m</Text>
                    </Stack>
                    <Stack
                      flexDirection={'row'}
                      justifyContent={'space-between'}
                    >
                      <Text>Índice de massa corporal</Text>
                      <Text>21.9 Kg/m2</Text>
                    </Stack>
                    <Stack
                      flexDirection={'row'}
                      justifyContent={'space-between'}
                    >
                      <Text>Classificação do IMC</Text>
                      <Text>eutrófico</Text>
                    </Stack>
                    <Stack
                      flexDirection={'row'}
                      justifyContent={'space-between'}
                    >
                      <Text>Faixa de peso ideal</Text>
                      <Text>62.6 a 84.3 Kg</Text>
                    </Stack>
                  </Stack>
                </Card.Body>
              </Card.Root>
            </div>
          </div>
        </div>
      </div>
    </AppProvider>
  );
}
