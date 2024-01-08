import { forwardRef } from 'react';

import { TPlanningMeal } from '@godiet-entities/planning/TPlanningMeal';
import { useAuth } from '@godiet-hooks/useAuth';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import styled from 'styled-components';

import COLORS from '../../../../constants/colors';
import PatientChartBarPlanning from '../PatientChartBarPlanning';
import PatientContentPlanning from '../PatientContentPlanning';

export interface PlanningExportedProps {
  planningMeal: TPlanningMeal;
  patientName: string;
}

export const PlanningExportedContainer = styled.div`
  display: none;
  flex-direction: column;
  gap: 24px;

  * {
    font-family: 'Poppins', sans-serif;
  }
`;

const PlanningExported = forwardRef<HTMLDivElement, PlanningExportedProps>(
  (props, ref) => {
    const { planningMeal, patientName } = props;

    const { name } = useAuth();

    return (
      <PlanningExportedContainer ref={ref}>
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <p style={{ fontSize: '24px' }}>Paciente: {patientName}</p>
          <h1 style={{ fontSize: '16px' }}>Nutricionista: {name}</h1>
          <p>
            Inicio do plano:
            {format(
              new Date(planningMeal.createdAt),
              // eslint-disable-next-line quotes
              "d 'de' MMMM 'de' yyyy",
              {
                locale: ptBR,
              }
            )}
          </p>
        </header>

        <PatientChartBarPlanning planningMeal={planningMeal} />
        <section>
          <p style={{ marginBottom: 16 }}>Legenda:</p>
          {Object.keys(COLORS)
            .filter((color) => color !== 'Calorias')
            .map((color) => (
              <div
                key={`legend-${color}`}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: COLORS[color as keyof typeof COLORS],
                  }}
                />
                <p>{color}</p>
              </div>
            ))}
        </section>
        <PatientContentPlanning planningMeal={planningMeal} />
      </PlanningExportedContainer>
    );
  }
);

PlanningExported.displayName = 'PlanningExported';

export { PlanningExported };
