import { CreatePlanningMealDTO } from '../../entities/planning/dtos/create-planning-meal-dto';
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

  findByPatientId = async (patientId: string | undefined) => {
    if (!patientId) {
      return null;
    }

    try {
      const result = await this.httpClient.get(`/${patientId}`);

      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  update = async () => {
    return null;
  };
}
