import HttpClient from '../HttpClient';

import { Service } from './PatientService';

const instance = new HttpClient('/patient');

const PatientService = new Service(instance);

export default PatientService;
