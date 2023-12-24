import { DataTotalType } from '@godiet-types/dataTotalType';

export type DataChartType = Omit<DataTotalType, 'energy' | 'name'>;
