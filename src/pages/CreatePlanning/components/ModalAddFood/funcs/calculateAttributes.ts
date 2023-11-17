import { TFood } from '../../../../../entities/food/TFood';

export function getCalculateAttributes(
  newQty: number,
  currentFood: TFood,
  attribute: string
) {
  const { baseQty, attributes } = currentFood;

  const currentAttribute = attributes.find((attr) => attr.name === attribute);

  if (!currentAttribute) {
    return 0;
  }

  return (newQty * Number(currentAttribute.qty)) / baseQty;
}
