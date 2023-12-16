import { TFood } from '@godiet-entities/food/TFood';
import {
  TFoodAttribute,
  TFoodPersistance,
} from '@godiet-entities/food/TFoodPrisma';

export type FormatFood = 'COMPLETE' | 'PARTIAL';

class FoodDatabaseMapper {
  toDomain(food: TFoodPersistance, format?: FormatFood): TFood {
    const { attributes, ...restFood } = food;

    return {
      ...restFood,
      attributes: this.getFilteredAttributes(attributes, format),
    };
  }

  private getFilteredAttributes(
    attributes: TFoodPersistance['attributes'],
    format?: FormatFood
  ) {
    const attributesPartial = ['protein', 'carbohydrate', 'energy', 'lipid'];

    let newAttributes = [];

    if (format === 'COMPLETE') {
      newAttributes = attributes;
    } else {
      newAttributes = attributes.filter((attribute) =>
        attributesPartial.includes(attribute.name)
      );
    }

    return newAttributes.map(this.verifyAttributes);
  }

  private verifyAttributes(attribute: TFoodAttribute): TFoodAttribute {
    const { name, qty, unit } = attribute;

    if (typeof qty === 'string') {
      const qtyIsNumber = Number(qty);

      if (qtyIsNumber) {
        return {
          name,
          qty: qtyIsNumber,
          unit,
        };
      }

      return {
        name,
        qty: 0,
        unit,
      };
    }

    return {
      name,
      qty,
      unit,
    };
  }
}

export default new FoodDatabaseMapper();
