import { createPatientDTO } from '../../entities/patient/dtos/create-patient-dto';
import { TPatient } from '../../entities/patient/TPatient';
import { TPatientPersistance } from '../../entities/patient/TPatientPersistance';
import HttpClient from '../HttpClient';

import PatientMapper from './mappers';

export class Service {
  constructor(private readonly httpClient: HttpClient) {
    this.getAll = this.getAll.bind(this);
  }

  async getAll() {
    const patientsPersistance =
      await this.httpClient.get<TPatientPersistance[]>('/');

    const patients = patientsPersistance.map(PatientMapper.toDomain);

    return patients;
  }

  async create(createPatient: createPatientDTO): Promise<TPatient> {
    const patientPersistance = await this.httpClient.post<
      TPatientPersistance,
      createPatientDTO
    >('/create', createPatient);

    const patientDomain = PatientMapper.toDomain(patientPersistance);

    return patientDomain;
  }

  async update() {}

  async delete() {}
}
