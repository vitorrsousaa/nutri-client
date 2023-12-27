import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';

import COLORS from '../../../../constants/colors';
import { DataChartType } from '../../types/dataChartType';

interface ChartSummaryFoodsProps {
  dataChart: DataChartType[];
}

export function ChartSummaryFoods(props: ChartSummaryFoodsProps) {
  const { dataChart } = props;
  return (
    <PieChart width={400} height={300}>
      <Pie
        dataKey="value"
        data={dataChart}
        cx={200}
        cy={150}
        innerRadius={40}
        outerRadius={80}
        label={({ x, y, value, unit, name }) => {
          return (
            <text
              x={x + 5}
              y={y - 5}
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
  );
}
