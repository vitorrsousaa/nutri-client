import { CreatePlanningMealDTO } from '@godiet-entities/planning/dtos/create-planning-meal-dto';
import { DataTotalType } from '@godiet-types/dataTotalType';
import Table from '@godiet-ui/Table';
import Text from '@godiet-ui/Text';

import { Control } from 'react-hook-form';

import ChartSummaryFoods from '../ChartSummaryFoods';

import { useSummaryPlanningHook } from './SummaryPlanning.hook';
import * as styled from './SummaryPlanning.styles';
export interface SummaryPlanningProps {
  control: Control<CreatePlanningMealDTO, unknown>;
}

export function SummaryPlanning(props: SummaryPlanningProps) {
  const { hasFoods, dataTable, dataChart, dataTableTotal } =
    useSummaryPlanningHook(props);

  return (
    <styled.SummaryPlanningContainer>
      <Text as="h1" fontWeight={500}>
        Resumo do plano alimentar
      </Text>
      {hasFoods ? (
        <div className="container-chart-table">
          <ChartSummaryFoods
            dataChart={dataChart.filter(
              (chartType) => chartType.name !== 'Calorias'
            )}
          />

          <Table.Root>
            <Table.Content variant={'simple'} size="md">
              <Table.Header>
                <Table.Row>
                  <Table.Th width={'250px'}>Refeição</Table.Th>
                  <Table.Th isNumeric>Carboidratos</Table.Th>
                  <Table.Th isNumeric>Proteína</Table.Th>
                  <Table.Th isNumeric>Gordura</Table.Th>
                  <Table.Th isNumeric>Calorias</Table.Th>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {dataTable.map((data) => (
                  <Table.Row key={`meal-${data.name}`}>
                    <Table.Td className="container-table-title-value">
                      {data.name}
                    </Table.Td>
                    <Table.Td isNumeric>{data.carbohydrate}</Table.Td>
                    <Table.Td isNumeric>{data.protein}</Table.Td>
                    <Table.Td isNumeric>{data.lipid}</Table.Td>
                    <Table.Td isNumeric>{data.energy}</Table.Td>
                  </Table.Row>
                ))}

                <Table.Row key={'meal-total'}>
                  {Object.keys(dataTableTotal).map((key) => (
                    <Table.Td
                      key={`meal-total-${key}`}
                      className={`${
                        typeof dataTableTotal[key as keyof DataTotalType] ===
                        'string'
                          ? 'container-table-title-value'
                          : ''
                      }`}
                      isNumeric={
                        typeof dataTableTotal[key as keyof DataTotalType] ===
                        'string'
                          ? false
                          : true
                      }
                    >
                      {dataTableTotal[key as keyof DataTotalType]}
                    </Table.Td>
                  ))}
                </Table.Row>
              </Table.Body>
            </Table.Content>
          </Table.Root>
        </div>
      ) : (
        <div className="container-empty-planning">
          <Text>Adicione alimentos no planejamento alimentar</Text>
        </div>
      )}
    </styled.SummaryPlanningContainer>
  );
}
