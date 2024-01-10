import { CreatePlanningMealDTO } from '@godiet-entities/planning/dtos/create-planning-meal-dto';

import HttpClient from '../HttpClient';

import PlanningMealMapper from './mappers/PlanningMealMapper';

interface IDeletePlanningMealInput {
  planningMealId: string;
  patientId: string;
}

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

  delete = async (deletePlanningMealInput: IDeletePlanningMealInput) => {
    const { planningMealId, patientId } = deletePlanningMealInput;

    const deletePlanningMealBody = {
      planningMealId,
    };

    return this.httpClient.delete(
      `/delete/${patientId}`,
      deletePlanningMealBody
    );
  };

  update = async () => {
    return null;
  };
}
