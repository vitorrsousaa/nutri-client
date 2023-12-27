import { CreatePlanningMealDTO } from '@godiet-entities/planning/dtos/create-planning-meal-dto';
import { TPlanningMeal } from '@godiet-entities/planning/TPlanningMeal';
import { TPlanningMealPersistance } from '@godiet-entities/planning/TPlanningMealPersistance';

import HttpClient from '../HttpClient';

import PlanningMealMapper from './mappers/PlanningMealMapper';

export class Service {
  constructor(private readonly httpClient: HttpClient) {}

  create = async ({
    createPlanningMeal,
    patientId,
  }: {
    createPlanningMeal: CreatePlanningMealDTO;
    patientId: string;
  }) => {
    const createPlanningMealToDatabase =
      PlanningMealMapper.toDatabase(createPlanningMeal);

    await this.httpClient.post(
      `/create/${patientId}`,
      createPlanningMealToDatabase
    );

    return null;
  };

  findByPatientId = async (
    patientId: string | undefined
  ): Promise<TPlanningMeal | null> => {
    if (!patientId) {
      return null;
    }

    const planningMealPersistance =
      await this.httpClient.get<TPlanningMealPersistance>(`/${patientId}`);

    return PlanningMealMapper.toDomain(planningMealPersistance);
  };

  update = async () => {
    return null;
  };
}
