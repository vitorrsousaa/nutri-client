import { TUpdatePatientDTO } from '@godiet-entities/patient/dtos/update-patient-dto';

import { TCreatePatientDTO } from '../../entities/patient/dtos/create-patient-dto';
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

  create = async (createPatient: TCreatePatientDTO) => {
    const patientPersistance = await this.httpClient.post<
      TPatientPersistance,
      TCreatePatientDTO
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

  update = async (updatePatientDTO: TUpdatePatientDTO) => {
    await this.httpClient.put(
      `/update/${updatePatientDTO.id}`,
      updatePatientDTO
    );
  };

  delete = async (id: string) => {
    await this.httpClient.delete(`/${id}`);
  };
}
