import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import CardPatient from '../CardPatient';

export function PanelPatients() {
  // const { patients } = useGetAllPatients();

  const patients = [
    {
      birthDate: new Date('2021-09-01T06:06:00.000Z'),
      email: 'string',
      id: 'string',
      gender: 'MASC',
      name: 'Theodory Kozlowski',
      height: 1,
      weight: 1,
    },
  ];

  return (
    <Tabs width={'100%'} height={'100%'}>
      <TabList>
        <Tab>Ativos </Tab>
        <Tab>Inativos</Tab>
        <Tab isDisabled>Todos</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          {patients.map((patient) => (
            <CardPatient key={patient.id} patient={patient} />
          ))}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
