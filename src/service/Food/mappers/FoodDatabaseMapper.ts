import { TFoodDatabase } from '../../../entities/food/TFoodPrisma';

class FoodDatabaseMapper {
  toDomain(food: TFoodDatabase) {
    return {
      name: food.name,
      calories: food.calories,
      protein: food.protein,
      carbo: food.carbo,
      fat: food.fat,
      quantity: food.quantity,
      id: food.id,
      group: food.group,
    };
  }
}

export default new FoodDatabaseMapper();
