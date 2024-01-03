import { TPatient } from '@godiet-entities/patient/TPatient';
import { TPatientPersistance } from '@godiet-entities/patient/TPatientPersistance';
import { TPlanningMeal } from '@godiet-entities/planning/TPlanningMeal';
import { TPlanningMealPersistance } from '@godiet-entities/planning/TPlanningMealPersistance';

class PatientMapper {
  toDomain(patient: TPatientPersistance): TPatient {
    return {
      birthDate: patient.birthDate,
      email: patient.email,
      gender: patient.gender,
      height: patient.height,
      id: patient.id,
      name: patient.name,
      weight: patient.weight,
      planningMeal:
        patient.planningMeal && patient.planningMeal.length > 0
          ? this.updatePlanningMealToDomain(patient.planningMeal[0])
          : undefined,
    };
  }

  updatePlanningMealToDomain(
    planningMealPersistance: TPlanningMealPersistance
  ): TPlanningMeal {
    const { id, description, meals, createdAt } = planningMealPersistance;

    return {
      id,
      description,
      createdAt: createdAt,
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
}

export default new PatientMapper();
