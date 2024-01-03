import { TPatient } from '@godiet-entities/patient/TPatient';

const patient: TPatient = {
  name: 'John Doe',
  birthDate: new Date('1990-01-01'),
  gender: 'MASC',
  height: 1.8,
  weight: 80,
  id: '1',
  email: 'any_email@email.com',
  planningMeal: {
    createdAt: new Date(),
    description: 'any_description',
    id: 'any_id',
    meals: [
      {
        id: 'any_id_meal',
        name: 'any_name_meal',
        time: new Date().toISOString(),
        mealFoods: [
          {
            id: 'any_id_meal_food',
            baseUnit: 'any_base_unit',
            carbohydrate: 0,
            energy: 0,
            foodId: 'any_food_id',
            lipid: 0,
            name: 'any_name',
            origin: 'TACO',
            protein: 0,
            quantity: 0,
          },
        ],
      },
    ],
  },
};

export default patient;
