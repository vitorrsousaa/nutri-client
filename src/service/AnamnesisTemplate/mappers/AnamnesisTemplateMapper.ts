import { TAnamnesisTemplate } from '@godiet-entities/anamnesisTemplate/TAnamnesisTemplate';
import { TAnamnesisTemplatePersistance } from '@godiet-entities/anamnesisTemplate/TAnamnesisTemplatePrisma';

class AnamnesisTemplateMapper {
  toDomain(template: TAnamnesisTemplatePersistance): TAnamnesisTemplate {
    return {
      id: template.id,
      text: template.text,
      createdAt: template.createdAt,
      userId: template.userId,
      title: template.title,
    };
  }
}

export default new AnamnesisTemplateMapper();
