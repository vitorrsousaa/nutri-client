import { TAnamnesis } from '@godiet-entities/anamnesis/TAnamnesis';
import { TAnamnesisPersistance } from '@godiet-entities/anamnesis/TAnamnesisPersistance';

class AnamnesisMapper {
  toDomain(anamnesis: TAnamnesisPersistance): TAnamnesis {
    return {
      id: anamnesis.id,
      text: anamnesis.text,
      createdAt: anamnesis.createdAt,
      patientId: anamnesis.patientId,
      title: anamnesis.title,
      updatedAt: anamnesis.updatedAt,
    };
  }
}

export default new AnamnesisMapper();
