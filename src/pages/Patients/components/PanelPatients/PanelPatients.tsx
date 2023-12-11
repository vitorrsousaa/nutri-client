import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { useGetAllPatients } from '../../../../hooks/patients';
import CardPatient from '../CardPatient';

export function PanelPatients() {
  const { patients } = useGetAllPatients();

  return (
    <Tabs width={'100%'} height={'100%'}>
      <TabList>
        <Tab>Ativos </Tab>
        <Tab isDisabled>Inativos</Tab>
        <Tab isDisabled>Todos</Tab>
      </TabList>

      <TabPanels>
        <TabPanel
          style={{
            display: 'grid',
            gap: '16px',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          }}
        >
          {patients.map((patient) => (
            <CardPatient key={patient.id} patient={patient} />
          ))}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
