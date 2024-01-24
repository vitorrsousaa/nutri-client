import HttpClient from '@godiet-services/HttpClient';

interface ICreateAntropometricServiceInput {
  weight: number;
  height: number;
  date: string;
  patientId: string;
}

interface TAntropometric {
  id: string;
  weight: number;
  height: number;
  date: string;
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
      { date: string; height: number; weight: number }
    >(`/${patientId}`, { date, height, weight });

    return this.mapperToDomain(antropometricPersistance);
  };

  getAll = async (patientId: string) => {
    const antropometricPersistance = await this.httpClient.get<
      TAntropometricPersistance[]
    >(`/${patientId}`);

    return antropometricPersistance.map(this.mapperToDomain);
  };

  delete = async ({
    patientId,
    antropometricId,
  }: {
    patientId: string;
    antropometricId: string;
  }) => {
    await this.httpClient.delete(`/${patientId}`, {
      id: antropometricId,
    });

    return null;
  };

  private mapperToDomain(
    antropometricPersistance: TAntropometricPersistance
  ): TAntropometric {
    return {
      id: antropometricPersistance.id,
      weight: antropometricPersistance.weight,
      height: antropometricPersistance.height,
      date: antropometricPersistance.createdAt,
    };
  }
}
