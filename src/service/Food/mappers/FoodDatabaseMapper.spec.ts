import { TFoodPersistance } from '@godiet-entities/food/TFoodPrisma';

import FoodDatabaseMapper from './FoodDatabaseMapper';

describe('FoodDatabaseMapper', () => {
  it('should transform NA as Number as a partial', () => {
    const food = {
      baseQty: 100,
      baseUnit: 'g',
      categoryName: 'Nozes e sementes',
      name: 'Pupunha, cozida',
      attributes: [
        { name: 'humidity', qty: 'NA', unit: 'percents' },
        { name: 'protein', qty: 'NA', unit: 'g' },
        { name: 'lipid', qty: 12.7616666666667, unit: 'g' },
        { name: 'cholesterol', qty: 'NA', unit: 'mg' },
        { name: 'carbohydrate', qty: 'NA', unit: 'g' },
        { name: 'fiber', qty: 'NA', unit: 'g' },
        { name: 'energy', qty: 218.533880876601, unit: 'kcal' },
      ],
    } as TFoodPersistance;

    // Act
    const result = FoodDatabaseMapper.toDomain(food, 'PARTIAL');

    // Assert
    expect(result.attributes[0].qty).toBe(0);
  });
  it('should transform NA as Number as a complete', () => {
    const food = {
      baseQty: 100,
      baseUnit: 'g',
      categoryName: 'Nozes e sementes',
      name: 'Pupunha, cozida',
      attributes: [
        { name: 'humidity', qty: 'NA', unit: 'percents' },
        { name: 'protein', qty: 'NA', unit: 'g' },
        { name: 'lipid', qty: 12.7616666666667, unit: 'g' },
        { name: 'cholesterol', qty: 'NA', unit: 'mg' },
        { name: 'carbohydrate', qty: 'NA', unit: 'g' },
        { name: 'fiber', qty: 'NA', unit: 'g' },
        { name: 'energy', qty: 218.533880876601, unit: 'kcal' },
      ],
    } as TFoodPersistance;

    // Act
    const result = FoodDatabaseMapper.toDomain(food, 'COMPLETE');

    // Assert
    expect(result.attributes[0].qty).toBe(0);
  });
});
