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

  create = async (createPatient: createPatientDTO) => {
    const patientPersistance = await this.httpClient.post<
      TPatientPersistance,
      createPatientDTO
    >('/create', createPatient);

    const patientDomain = PatientMapper.toDomain(patientPersistance);

    return patientDomain;
  };

  async findById(id: string | undefined): Promise<TPatient | null> {
    if (!id) {
      return null;
    }

    const patientPersistance = await this.httpClient.get<TPatientPersistance>(
      `/${id}`
    );

    const patientDomain = PatientMapper.toDomain(patientPersistance);

    return patientDomain;
  }

  async update() {}

  delete = async (id: string | undefined) => {
    if (!id) {
      return null;
    }

    await this.httpClient.delete(`/${id}`);
  };
}
