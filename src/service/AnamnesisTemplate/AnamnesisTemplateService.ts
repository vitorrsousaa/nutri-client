import { TAnamnesisTemplate } from '@godiet-entities/anamnesisTemplate/TAnamnesisTemplate';
import { TAnamnesisTemplatePersistance } from '@godiet-entities/anamnesisTemplate/TAnamnesisTemplatePrisma';

import HttpClient from '../HttpClient';

import { AnamnesisTemplateMapper } from './mappers';

export class Service {
  constructor(private readonly httpClient: HttpClient) {}

  getAll = async (): Promise<TAnamnesisTemplate[]> => {
    const anamnesisTemplates =
      await this.httpClient.get<TAnamnesisTemplatePersistance[]>('/');

    return anamnesisTemplates.map(AnamnesisTemplateMapper.toDomain);
  };
}
