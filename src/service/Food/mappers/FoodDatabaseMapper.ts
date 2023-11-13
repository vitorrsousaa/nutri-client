import { TFood } from '../../../entities/food/TFood';
import { TFoodTaco } from '../../../entities/food/TFoodPrisma';

export type FormatFood = 'COMPLETE' | 'PARTIAL';

class FoodDatabaseMapper {
  toDomain(food: TFoodTaco, format?: FormatFood): TFood {
    const { attributes, ...restFood } = food;

    return {
      ...restFood,
      attributes: this.getFilteredAttributes(attributes, format),
    };
  }

  private getFilteredAttributes(
    attributes: TFoodTaco['attributes'],
    format?: FormatFood
  ) {
    const attributesPartial = ['protein', 'carbohydrate', 'energy', 'lipid'];

    if (format === 'COMPLETE') {
      return attributes;
    }

    return attributes.filter((attribute) =>
      attributesPartial.includes(attribute.name)
    );
  }
}

export default new FoodDatabaseMapper();
