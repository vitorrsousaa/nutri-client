import HttpClient from '../HttpClient';

import { Service } from './AnamnesisTemplateService';

const AnamnesisTemplateService = new Service(
  new HttpClient('/anamnesis-template')
);

export default AnamnesisTemplateService;
