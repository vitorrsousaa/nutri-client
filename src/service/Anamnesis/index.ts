import HttpClient from '../HttpClient';

import { Service } from './AnamnesisService';

const AnamnesisService = new Service(new HttpClient('/anamnesis'));

export default AnamnesisService;
