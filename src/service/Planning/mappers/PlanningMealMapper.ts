import { CreatePlanningMealDatabaseDTO } from '../../../entities/planning/dtos/create-planning-meal-database-dto';
import { CreatePlanningMealDTO } from '../../../entities/planning/dtos/create-planning-meal-dto';

class PlanningMealMapper {
  toDatabase(
    planningMeal: CreatePlanningMealDTO
  ): CreatePlanningMealDatabaseDTO {
    return {
      description: planningMeal.description,
      meals: this.updateMealToDatabase(planningMeal.meals),
    };
  }

  private updateMealToDatabase(
    meals: CreatePlanningMealDTO['meals']
  ): CreatePlanningMealDatabaseDTO['meals'] {
    return meals.map((meal) => {
      const { foods } = meal;

      const newFoods = foods.map((food) => {
        return {
          id: food.foodId,
          name: food.name,
          origin: food.origin,
          quantity: food.quantity,
          calories: food.energy,
          protein: food.protein,
          fat: food.lipid,
          carb: food.carbohydrate,
          baseUnit: food.baseUnit,
        };
      });

      return {
        name: meal.name,
        time: meal.time,
        foods: newFoods,
      };
    });
  }
}

export default new PlanningMealMapper();
