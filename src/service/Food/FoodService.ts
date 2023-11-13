import { TOriginFoodEnum } from '../../entities/food/origin/TOrigin';
import { TFood } from '../../entities/food/TFood';
import { TFoodTaco } from '../../entities/food/TFoodPrisma';
import HttpClient from '../HttpClient';

import FoodDatabaseMapper from './mappers/FoodDatabaseMapper';

export class Service {
  constructor(private readonly httpClient: HttpClient) {}

  getAll = async (origin: TOriginFoodEnum): Promise<TFood[]> => {
    const foodsPersistance = await this.httpClient.get<TFoodTaco[]>(
      `/${origin}`
    );

    return foodsPersistance.map((food) =>
      FoodDatabaseMapper.toDomain(food, 'PARTIAL')
    );
  };
}
