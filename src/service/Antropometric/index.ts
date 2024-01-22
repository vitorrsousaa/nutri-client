import HttpClient from '@godiet-services/HttpClient';

import { Service } from './AntropometricService';

const AntropometricService = new Service(new HttpClient('/antropometric'));

export default AntropometricService;
