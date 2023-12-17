type NumberKeys<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

const calculateAttributes = <T extends Record<string, unknown>>(
  attribute: NumberKeys<T>,
  data: T[]
) => {
  const total = data.reduce((acc, food) => {
    const value = food[attribute] as number;
    return acc + value;
  }, 0);

  return Math.round(total);
};

export default calculateAttributes;
