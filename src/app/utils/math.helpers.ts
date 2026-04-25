export const safeNumber = (value: unknown): number => {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
};

export const average = (values: number[]): number => {
  if (!values.length) {
    return 0;
  }

  return values.reduce((acc, value) => acc + value, 0) / values.length;
};

export const sum = (values: number[]): number => values.reduce((acc, value) => acc + value, 0);

export const round = (value: number, digits = 2): number => {
  const factor = Math.pow(10, digits);
  return Math.round(value * factor) / factor;
};
