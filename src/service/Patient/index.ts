import HttpClient from '../HttpClient';

import { Service } from './PatientService';

const PatientService = new Service(new HttpClient('/patient'));

export default PatientService;
