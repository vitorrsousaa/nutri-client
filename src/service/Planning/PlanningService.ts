import { CreatePlanningMealDTO } from '../../entities/planning/dtos/create-planning-meal-dto';
import HttpClient from '../HttpClient';

import PlanningMealMapper from './mappers/PlanningMealMapper';

export class Service {
  constructor(private readonly httpClient: HttpClient) {}

  create = async (
    createPlanningMealDomainDTO: CreatePlanningMealDTO,
    patientId: string
  ): Promise<null> => {
    const createPlanningMealToDatabase = PlanningMealMapper.toDatabase(
      createPlanningMealDomainDTO
    );

    await this.httpClient.post(
      `/create/${patientId}`,
      createPlanningMealToDatabase
    );

    return null;
  };
}
