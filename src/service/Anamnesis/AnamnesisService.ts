import { TAnamnesis } from '@godiet-entities/anamnesis/TAnamnesis';
import { TAnamnesisCreateDTO } from '@godiet-entities/anamnesis/TAnamnesisCreateDTO';
import { TAnamnesisPersistance } from '@godiet-entities/anamnesis/TAnamnesisPersistance';
import HttpClient from '@godiet-services/HttpClient';

import AnamnesisMapper from './mappers/AnamnesisMapper';

interface ICreateAnamnesisServiceInput {
  anamnesis: TAnamnesisCreateDTO;
  patientId: string;
}

export class Service {
  constructor(private readonly httpClient: HttpClient) {}

  create = async (
    createAnamnesisServiceInput: ICreateAnamnesisServiceInput
  ): Promise<TAnamnesis> => {
    const { anamnesis, patientId } = createAnamnesisServiceInput;

    const anamnesisPersistance = await this.httpClient.post<
      TAnamnesisPersistance,
      TAnamnesisCreateDTO
    >(`/${patientId}`, anamnesis);

    return AnamnesisMapper.toDomain(anamnesisPersistance);
  };

  getAll = async (patientId: string): Promise<TAnamnesis[]> => {
    const anamnesisPersistance = await this.httpClient.get<
      TAnamnesisPersistance[]
    >(`/${patientId}`);

    return anamnesisPersistance.map(AnamnesisMapper.toDomain);
  };
}
