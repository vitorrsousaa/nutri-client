const foods = [
  {
    baseQty: 100,
    baseUnit: 'g',
    categoryName: 'Cereais e derivados',
    name: 'Arroz, integral, cozido',
    attributes: [{ name: 'energy', qty: 123.5348925, unit: 'kcal' }],
  },
  {
    baseQty: 100,
    baseUnit: 'g',
    categoryName: 'Cereais e derivados',
    name: 'Arroz, integral, cozido',
    attributes: [{ name: 'energy', qty: 123.5348925, unit: 'kcal' }],
  },
  {
    baseQty: 100,
    baseUnit: 'g',
    categoryName: 'Cereais e derivados',
    name: 'Arroz, integral, cozido',
    attributes: [{ name: 'energy', qty: 123.5348925, unit: 'kcal' }],
  },
  {
    baseQty: 100,
    baseUnit: 'g',
    categoryName: 'Verduras, hortaliças e derivados',
    name: 'Batata, frita, tipo chips, industrializada',
    attributes: [{ name: 'energy', qty: 542.73467338419, unit: 'kcal' }],
  },
  {
    baseQty: 100,
    baseUnit: 'g',
    categoryName: 'Verduras, hortaliças e derivados',
    name: 'Farinha, de mandioca, crua',
    attributes: [{ name: 'energy', qty: 360.869698550725, unit: 'kcal' }],
  },
  {
    baseQty: 100,
    baseUnit: 'g',
    categoryName: 'Verduras, hortaliças e derivados',
    name: 'Pimentão, amarelo, cru',
    attributes: [{ name: 'energy', qty: 27.9274594202899, unit: 'kcal' }],
  },
];

export default foods.map((food) => ({ label: food.name, value: food.name }));
