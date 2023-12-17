import { CreatePlanningMealDatabaseDTO } from '@godiet-entities/planning/dtos/create-planning-meal-database-dto';
import { CreatePlanningMealDTO } from '@godiet-entities/planning/dtos/create-planning-meal-dto';
import { TPlanningMeal } from '@godiet-entities/planning/TPlanningMeal';
import { TPlanningMealPersistance } from '@godiet-entities/planning/TPlanningMealPersistance';

class PlanningMealMapper {
  toDatabase(
    planningMeal: CreatePlanningMealDTO
  ): CreatePlanningMealDatabaseDTO {
    return {
      description: planningMeal.description,
      meals: this.updateMealToDatabase(planningMeal.meals),
    };
  }

  toDomain(planningMeal: TPlanningMealPersistance): TPlanningMeal {
    const { id, description, meals } = planningMeal;

    return {
      id,
      description,
      meals: meals.map((meal) => {
        return {
          id: meal.id,
          name: meal.name,
          time: meal.time,
          mealFoods: meal.mealFoods.map((mealFood) => {
            return {
              id: mealFood.id,
              name: mealFood.name,
              quantity: mealFood.quantity,
              baseUnit: mealFood.baseUnit,
              foodId: mealFood.foodId,
              origin: mealFood.foodOrigin,
              energy: mealFood.calories,
              protein: mealFood.protein,
              carbohydrate: mealFood.carb,
              lipid: mealFood.fat,
            };
          }),
        };
      }),
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
