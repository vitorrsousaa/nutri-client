import { TFood } from '../../../../../entities/food/TFood';

import { getCalculateAttributes } from './calculateAttributes';

describe('calculateAttribute', () => {
  const sampleFood: TFood = {
    name: 'Sample Food',
    baseQty: 100,
    baseUnit: 'g',
    categoryName: 'Sample Category',
    id: '123',
    attributes: [
      { qty: 10, name: 'Attribute1', unit: 'unit1' },
      { qty: 20, name: 'Attribute2', unit: 'unit2' },
    ],
  };

  it('calculates attribute correctly for existing attribute', () => {
    const newQty = 150;
    const attribute = 'Attribute1';

    const result = getCalculateAttributes(newQty, sampleFood, attribute);

    // Expected result: (150 * 10) / 100 = 15
    expect(result).toBe(15);
  });

  it('returns 0 for non-existing attribute', () => {
    const newQty = 200;
    const attribute = 'NonExistingAttribute';

    const result = getCalculateAttributes(newQty, sampleFood, attribute);

    // Expected result: 0, as the attribute does not exist in the sampleFood
    expect(result).toBe(0);
  });
});
