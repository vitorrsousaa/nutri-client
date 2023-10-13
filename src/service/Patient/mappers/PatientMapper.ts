import { TPatient } from '../../../entities/patient/TPatient';
import { TPatientPersistance } from '../../../entities/patient/TPatientPersistance';

class PatientMapper {
  toDomain(patient: TPatientPersistance): TPatient {
    return {
      birthDate: patient.birthDate,
      email: patient.email,
      gender: patient.gender,
      height: patient.height,
      id: patient.id,
      name: patient.name,
      weight: patient.weight,
    };
  }
}

export default new PatientMapper();
