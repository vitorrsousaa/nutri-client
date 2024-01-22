import HttpClient from '@godiet-services/HttpClient';

interface ICreateAntropometricServiceInput {
  weight: number;
  height: number;
  date: Date;
  patientId: string;
}

interface TAntropometric {
  id: string;
  weight: number;
  height: number;
  date: Date;
}

interface TAntropometricPersistance {
  id: string;
  userId: string;
  patientId: string;
  createdAt: string;
  updatedAt: string;
  weight: 90;
  height: 10;
}

export class Service {
  constructor(private readonly httpClient: HttpClient) {}

  create = async (
    createAntropometricServiceInput: ICreateAntropometricServiceInput
  ): Promise<TAntropometric> => {
    const { date, height, patientId, weight } = createAntropometricServiceInput;

    const antropometricPersistance = await this.httpClient.post<
      TAntropometricPersistance,
      { date: Date; height: number; weight: number }
    >(`/${patientId}`, { date, height, weight });

    return this.mapperToDomain(antropometricPersistance);
  };

  private mapperToDomain(
    antropometricPersistance: TAntropometricPersistance
  ): TAntropometric {
    return {
      id: antropometricPersistance.id,
      weight: antropometricPersistance.weight,
      height: antropometricPersistance.height,
      date: new Date(antropometricPersistance.createdAt),
    };
  }
}
