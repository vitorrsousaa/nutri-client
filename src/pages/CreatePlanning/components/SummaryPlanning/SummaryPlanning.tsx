import { useCallback, useMemo } from 'react';

import {
  CreateFoodDTO,
  CreatePlanningMealDTO,
} from '@godiet-entities/planning/dtos/create-planning-meal-dto';
import Text from '@godiet-ui/Text';

import { Control, useWatch } from 'react-hook-form';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';

import COLORS from '../../../../constants/colors';
import { DataChartType } from '../../types/dataChartType';

interface SummaryPlanningProps {
  control: Control<CreatePlanningMealDTO, unknown>;
}

export function SummaryPlanning(props: SummaryPlanningProps) {
  const { control } = props;

  const meals = useWatch({
    control,
    name: 'meals',
  });

  const hasFoods = useMemo(
    () =>
      meals.some(
        (meal) =>
          meal.foods.length > 0 && meal.foods.every((food) => food.name !== '')
      ),
    [meals]
  );

  const dataMeals = useMemo<CreateFoodDTO[]>(
    () => meals.map((meal) => meal.foods).flat(),
    [meals]
  );

  const calculateAttributes = useCallback(
    (
      attribute: 'carbohydrate' | 'energy' | 'lipid' | 'protein' | 'quantity',
      data: CreateFoodDTO[]
    ) => {
      const total = data.reduce((acc, food) => {
        return acc + food[attribute];
      }, 0);

      return total;
    },
    []
  );

  const dataChart = useMemo<DataChartType[]>(() => {
    const totalCarbohydrate = calculateAttributes('carbohydrate', dataMeals);
    const totalProtein = calculateAttributes('protein', dataMeals);
    const totalLipid = calculateAttributes('lipid', dataMeals);
    const totalEnergy = calculateAttributes('energy', dataMeals);

    return [
      {
        name: 'Carboidratos',
        value: Math.round(totalCarbohydrate),
        unit: 'g',
      },
      {
        name: 'Proteínas',
        value: Math.round(totalProtein),
        unit: 'g',
      },
      {
        name: 'Lipídios',
        value: Math.round(totalLipid),
        unit: 'g',
      },
      {
        name: 'Calorias',
        value: Math.round(totalEnergy),
        unit: 'kcal',
      },
    ];
  }, [calculateAttributes, dataMeals]);

  return (
    <div
      style={{
        padding: '16px',
        borderRadius: '8px',
        border: 'solid 1px #ccc',
      }}
    >
      <h1>Resumo do plano alimentar</h1>
      {hasFoods ? (
        <>
          <PieChart width={400} height={300}>
            <Pie
              dataKey="value"
              data={dataChart.filter(
                (chartType) => chartType.name !== 'Calorias'
              )}
              cx={200}
              cy={150}
              innerRadius={40}
              outerRadius={80}
              label={({ x, y, value, unit, name }) => {
                return (
                  <text
                    x={x}
                    y={y}
                    fill={COLORS[name as DataChartType['name']]}
                    textAnchor="middle"
                  >
                    {value} {unit}
                  </text>
                );
              }}
            >
              {dataChart.map((entry) => (
                <Cell
                  key={`cell-${entry.name}-${entry.value}`}
                  fill={COLORS[entry.name as DataChartType['name']]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, _, __, index) => {
                return (
                  <>
                    {value} {dataChart[index].unit}
                  </>
                );
              }}
            />
            <Legend />
          </PieChart>
        </>
      ) : (
        <div>
          <Text>Adicione alimentos no planejamento alimentar</Text>
        </div>
      )}
    </div>
  );
}
